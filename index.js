const express=require('express');
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app=express()
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
const uri = `mongodb+srv://${process.env.Secret_UserName}:${process.env.Secret_Key}@cluster0.tefm3zp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
 const collegeCollection=client.db('collegeBooking').collection('colleges')
 const galleryCollection=client.db('collegeBooking').collection('gallery')
 const admissionCollection=client.db('collegeBooking').collection('admission')
 const reviewCollection=client.db('collegeBooking').collection('review')

 app.get('/colleges', async(req,res)=>{
  const result=await collegeCollection.find().limit(3).toArray()
  res.send(result)
 })
 app.get('/home/colleges', async(req,res)=>{
  const result=await collegeCollection.find().toArray()
  res.send(result)
 })
 app.get('/college/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const result=await collegeCollection.findOne(query);
  res.send(result)
 })
 app.get('/gallery', async(req,res)=>{
  const result=await galleryCollection.find().toArray();
  res.send(result)
 })
 app.get('/research', async(req,res)=>{
  const result=await galleryCollection.find().toArray();
  res.send(result)
 })

 app.get('/admission', async (req, res) => {
  let query = {};
  if (req.query && req.query.email) {
    query = { email: req.query.email };
  }
  const result = await admissionCollection.find(query).toArray();
  res.send(result);
});

 app.post('/admission',async(req,res)=>{
  const admissionInfo=req.body
  const result=await admissionCollection.insertOne(admissionInfo)
  res.send(result)
 })
 app.post('/reviews',async(req,res)=>{
  const review=req.body
  console.log(review);
  const result=await reviewCollection.insertOne(review)
  res.send(result)
 })
 app.get('/reviews',async(req,res)=>{
  const result=await reviewCollection.find().toArray()
  res.send(result)
 })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
 res.send('Hello World!')
})

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})
