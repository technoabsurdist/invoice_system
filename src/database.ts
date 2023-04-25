import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

// import dotenv from 'dotenv';
// dotenv.config();
// const mongo_pass = process.env.MONGO_PASSWORD;
// const uri = `mongodb+srv://andereemi:${mongo_pass}@cluster0.z12cm7l.mongodb.net/?retryWrites=true&w=majority`;

// obviously not secure, but atm doesn't really matter right now. Just testing
// const uri = `mongodb+srv://andereemi:ejzDsAraY3sW93nW@cluster0.z12cm7l.mongodb.net/?retryWrites=true&w=majority`;

dotenv.config();
const uri = process.env.MONGODB_URI || "";

const setupDatabase = async () => {
    console.log(uri)
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