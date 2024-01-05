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

export async function getAllDocuments(
  client,
  collection,
  sort,
  filter = {}
) {
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

export async function getDocument(client, collection, filter) {
  const db = client.db();
  try {
    const eventDoc = await db.collection(collection).findOne(filter);

    client.close();
    return eventDoc;
  } catch (error) {
    client.close();
    throw Error('Getting event failed.');
  }
}

export async function updateDocument(
  client,
  collection,
  filter,
  document,
  options
) {
  const db = client.db();

  const updatedData = await db
    .collection(collection)
    .updateOne(filter, document, options);

  return updatedData;
}

export async function deleteDocument(client, collection, filter) {
  const db = client.db();

  const deletedData = await db.collection(collection).deleteOne(filter);

  return deletedData;
}
