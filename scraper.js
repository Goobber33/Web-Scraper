const axios = require('axios');

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

const processUrl = async (client, url, callback) => {
  console.log(`Fetching ${url}`);
  const data = await fetchData(url);

  if (data) {
    console.log(`Parsing data from ${url}`);
    const parsedData = parseData(data, url);
    saveData(client, parsedData, url, callback);
  } else {
    callback();
  }
};

const saveData = (client, data, url, callback) => {
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

module.exports = { processUrl, urls };
