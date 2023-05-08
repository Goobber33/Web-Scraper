const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { processUrl, urls } = require('./scraper');

require('dotenv').config();

const app = express();
app.use(cors());

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jslrvg2.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

app.get('/api/data', async (req, res) => {
  try {
    const db = client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME);

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
