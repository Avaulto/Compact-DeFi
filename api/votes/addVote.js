const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



export default async function addVote(request, response) {
  const { endpoint } = request.query;
  const { proposalId, vote, signer } = request.body
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // const queryParamDecode = decodeURIComponent(queryParam);
    const db = client.db("CDv1")
    const collection = db.collection('proposals')

    // create a filter for a movie to update
    const filter = { _id: proposalId };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        for: +1,
        against: +1 ,
      },
    };
    await collection.updateOne(filter, updateDoc, options);
    // const res = await fetch(url, settings, JSON.stringify(body));
    await res.json({ message: 'vote added' });
    return response.status(200).json(res);
  } catch (error) {
    return response.status(500).json({message:'fail to vote', error});
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}