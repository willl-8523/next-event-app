import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://events-data:7Aq44pngQrkAmxYY@$cluster0.55nsvyz.mongodb.net/events-app?retryWrites=true&w=majority&appName=AtlasApp'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  /**
   * retrieve all data from the 'comments' collection in
   * descending order and transform them into an array
   */
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
