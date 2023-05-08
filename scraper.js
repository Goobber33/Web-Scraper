const axios = require('axios');
const async = require('async');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jslrvg2.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const urls = [
  `https://pokeapi.co/api/v2/pokemon/${getRandomInt(151)}`, // Adding PokeAPI URL for a random Pokemon
];

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching URL ${url}: ${error}`);
    return null;
  }
};

const parseData = (data, url) => {
  const parsedData = {};

  if (url.includes('pokeapi.co')) {
    // Handle PokeAPI JSON data
    return {
      name: data.name,
      id: data.id,
      types: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
    };
  }

  return parsedData;
};

const saveData = (data, url, callback) => {
  try {
    const db = client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME);

    collection.insertOne({ url, ...data }, (error, result) => {
      if (error) {
        console.error(`Error saving data to MongoDB Atlas for URL: ${url}: ${error}`);
        return callback(error);
      }

      console.log(`Data saved to MongoDB Atlas for URL: ${url}`);
      callback(null);
    });
  } catch (error) {
    console.error(`Error saving data to MongoDB Atlas for URL: ${url}: ${error}`);
    callback(error);
  }
};

const processUrl = async (url, callback) => {
  console.log(`Fetching ${url}`);
  const data = await fetchData(url);

  if (data) {
    console.log(`Parsing data from ${url}`);
    const parsedData = parseData(data, url); 
    saveData(parsedData, url, callback);
  } else {
    callback();
  }
};

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const main = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const queue = async.queue(processUrl, 2); // Rate limit: 2 concurrent requests

    queue.push(urls[0], (error) => {
      if (error) {
        console.error(`Error processing URL: ${error}`);
      } else {
        console.log('URL processed successfully.');
      }
    });

    queue.drain = async () => {
      if (queue.idle()) {
        console.log('All URLs have been processed.');
        await client.close();
      }
    };
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

main();
