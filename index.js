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
    const detectCollection = client.db('railway').collection('detect');

    app.get('/record', async (req, res) => {
      const records = await detectCollection.find().toArray();
      res.send(records);
    });
  } finally {
  }
};

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
