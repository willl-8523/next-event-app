import {
  connectDatabase,
  deleteDocument,
  getAllDocuments,
  updateDocument,
} from '../../../utils/db-utils';
import { ObjectId } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const event = await getAllDocuments(
        client,
        'events',
        { _id: -1 },
        { _id: new ObjectId(eventId) }
      );

      return res.status(200).json({ event: event });
    } catch (error) {
      return res.status(500).json({ message: 'Getting event failed.' });
    }
  }

  if (req.method === 'PATCH') {
    const updateEventData = req.body;

    if (!updateEventData) {
      return res.status(400).json({ message: 'Event is required' });
    }

    if (
      !updateEventData.title?.trim() ||
      !updateEventData.description?.trim() ||
      !updateEventData.date?.trim() ||
      !updateEventData.time?.trim() ||
      !updateEventData.image?.trim() ||
      !updateEventData.location?.trim()
    ) {
      return res.status(400).json({ message: 'Invalid data provided.' });
    }

    try {
      const updatedData = await updateDocument(
        client,
        'events',
        { _id: new ObjectId(eventId) },
        { $set: { ...updateEventData } },
        { upsert: true }
      );

      return res.json({ event: updatedData });
    } catch (error) {
      return res.status(500).json({ message: 'Updating event failed.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedData = await deleteDocument(client, 'events', {
        _id: new ObjectId(eventId),
      });
      res.json({ deletedData, message: 'Event deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Delete event failed.' });
    }
  }

  client.close();
}

export default handler;
