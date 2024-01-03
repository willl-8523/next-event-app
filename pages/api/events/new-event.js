import { connectDatabase, insertDocument } from '../../../utils/db-utils';

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const event = req.body;

    if (!event) {
      return res.status(400).json({ message: 'Event is required' });
    }

    if (
      !event.title?.trim() ||
      !event.description?.trim() ||
      !event.date?.trim() ||
      !event.time?.trim() ||
      !event.image?.trim() ||
      !event.location?.trim()
    ) {
      res.status(400).json({ message: 'Invalid data provided.' });
      client.close();
      return;
    }

    const newEvent = {
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      image: event.image,
      location: event.location,
    };

    let result;

    try {
      result = await insertDocument(client, 'events', newEvent);

      // Add id property in newComment
      newEvent.id = result.insertedId;

      res.status(201).json({ message: 'Added comment', event: newEvent });
    } catch (error) {
      res.status(500).json({ message: 'Inserting event failed!' });
      return;
    }
  }

  client.close();
}

export default handler;
