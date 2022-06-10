const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://crudtest:${process.env.DB_PASS}@cluster0.vpvy3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    const recordCollection = client.db('record-crud').collection('records');

    app.post('/record', async (req, res) => {
      const record = req.body;
      const result = await recordCollection.insertOne(record);
      res.send(result);
    });

    app.get('/record', async (req, res) => {
      const records = await recordCollection.find().toArray();
      res.send(records);
    });

    app.get('/record/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await recordCollection.findOne(query);
      res.send(result);
    });

    app.put('/record/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: req.body,
      };
      const result = await recordCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    app.delete('/record/:id', async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await recordCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(port, () => {
  console.log('server is running', port);
});
