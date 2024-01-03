import {
  connectDatabase,
  fetchDataBase,
  getAllDocuments,
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

  if (req.method === 'PUT') {
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
      // const
      const events = await fetchDataBase(client, 'events');
      const filter = { _id: new ObjectId(eventId) };
      const options = { upsert: true };
      const updateDoc = { $set: { ...updateEventData } };

      const updatedData = await events.updateOne(filter, updateDoc, options);

      return res.json({ event: updatedData });
    } catch (error) {
      return res.status(500).json({ message: 'Updating event failed.' });
    }
  }

  // if (req.method === 'DELETE') {
  //   const eventsFileContent = fs.readFileSync(
  //     filepath + '/events.json',
  //     'utf-8'
  //   );
  //   const events = JSON.parse(eventsFileContent);

  //   const eventIndex = events.findIndex((event) => event.id === eventId);

  //   if (eventIndex === -1) {
  //     return res.status(404).json({ message: 'Event not found' });
  //   }

  //   events.splice(eventIndex, 1);

  //   try {
  //     fs.writeFileSync(filepath + '/events.json', JSON.stringify(events), {
  //       flag: 'w',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   res.json({ message: 'Event deleted' });
  // }

  // const eventsData = fs.readFileSync(filepath + '/events.json', 'utf8');
  // const events = JSON.parse(eventsData);

  // const event = events.find((event) => event.id === eventId);

  // if (!event) {
  //   return res.status(404).json({ message: `No event could be found.` });
  // }

  // res.json({ event });
  client.close();
}

export default handler;
