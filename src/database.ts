import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://andereemi:ejzDsAraY3sW93nW@cluster0.z12cm7l.mongodb.net/?retryWrites=true&w=majority";

const setupDatabase = async () => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();

  const db = client.db("cluster0");

  const invoicesCollection = db.collection("invoices");
  const invoiceItemsCollection = db.collection("invoice_items");

  return { invoicesCollection, invoiceItemsCollection };
};

export default setupDatabase;