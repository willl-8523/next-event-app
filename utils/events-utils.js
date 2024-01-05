import { connectDatabase, getAllDocuments, getDocument } from './db-utils';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';

export async function getAllEvents({ max, searchTerm }) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    throw Error('Failed to connect database');
  }

  try {
    let events = await getAllDocuments(client, 'events', { _id: -1 });

    if (searchTerm) {
      events = events.filter((event) => {
        const searchableText = `${event.title} ${event.description} ${event.location}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (max) {
      events = events.slice(0, max);
    }
    client.close();
    return events;
  } catch (error) {
    client.close();
    throw Error('Getting events failed.');
  }
}

export async function getEvent(eventId) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    throw Error('Failed to connect to database.');
  }

  try {
    const event = await getDocument(client, 'events', {
      _id: new ObjectId(eventId),
    });
    
    client.close();
    return event;
  } catch (error) {
    client.close();
    throw Error('Getting event failed.');
  }

}

export function getImages() {
  const eventsDirectory = path.join(process.cwd(), 'data');
  const createPath = path.join(eventsDirectory, 'images.json');
  const fileContent = fs.readFileSync(createPath, 'utf-8');

  const images = JSON.parse(fileContent);

  return images;
}
