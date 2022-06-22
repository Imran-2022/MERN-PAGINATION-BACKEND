const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://pagination:<password>@cluster0.bp8ax.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const dataCollection= client.db("pagination").collection("pagination-data");


    // -----------------> load all data 
    app.get('/', async (req, res) => {
        const query = {}
        const result = await dataCollection.find(query).toArray();
        res.status(200).json(result)
    })


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
