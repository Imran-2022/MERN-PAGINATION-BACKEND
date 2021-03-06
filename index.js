const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
app.use(express.json())
app.use(cors())
const db_user=process.env.db_user;
const db_pass = process.env.db_pass;

const uri = `mongodb+srv://${db_user}:${db_pass}@cluster0.bp8ax.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      console.log("mongodb connected")
      const dataCollection= client.db("pagination").collection("pagination-data");


    // -----------------> load all data 
    app.get('/products', async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      // console.log(page,size)

        const query = {}
        let products;
        if(page || size) {
          products= await dataCollection.find(query).skip(page*10).limit(size).toArray();
        }else{
          products= await dataCollection.find(query).toArray();
        }
        res.status(200).json(products)
       
    })

    // count total data available 
    app.get ('/productCount',async (req, res) => {
      const query = {};
      const count = await dataCollection.countDocuments();
      // res.json(count);// send as json or 
      res.send({count})
    })


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
