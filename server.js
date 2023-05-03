const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jslrvg2.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME);

    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB Atlas:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
