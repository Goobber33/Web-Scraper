const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jslrvg2.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

connectToMongoDB();

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/data', async (req, res) => {
  try {
    const db = client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME);

    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB Atlas:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
