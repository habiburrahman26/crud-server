const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
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
      res.send(result)
    });
  } finally {
  }
};

run().catch(console.dir);

app.listen(port, () => {
  console.log('server is running', port);
});
