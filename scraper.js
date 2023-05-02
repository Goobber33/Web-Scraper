const axios = require('axios');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');

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

const saveData = (data, filename) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving data to ${filename}: ${error}`);
  }
};

const processUrl = async (url, callback) => {
  console.log(`Fetching ${url}`);
  const html = await fetchData(url);

  if (html) {
    console.log(`Parsing data from ${url}`);
    const data = parseData(html);
    const filename = `data/${encodeURIComponent(url)}.json`;
    saveData(data, filename);
  }

  callback();
};

const main = () => {
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
  });
};

main();
