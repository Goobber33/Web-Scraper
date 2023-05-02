const axios = require('axios');
const cheerio = require('cheerio');
const async = require('async');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jslrvg2.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const urls = [
  'http://books.toscrape.com/',
  'http://quotes.toscrape.com/',
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

const parseData = (html) => {
  const $ = cheerio.load(html);
  const data = {};

  // Extract and parse data from the HTML using Cheerio
  data.title = $('h1').text().trim();

  return data;
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
    const html = await fetchData(url);
  
    if (html) {
      console.log(`Parsing data from ${url}`);
      const data = parseData(html);
      saveData(data, url, callback);
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

    queue.push(urls, (error) => {
      if (error) {
        console.error(`Error processing URL: ${error}`);
      } else {
        console.log('URL processed successfully.');
      }
    });

    queue.drain(() => {
      console.log('All URLs have been processed.');
      client.close();
    });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

main();
