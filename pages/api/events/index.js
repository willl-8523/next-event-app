import { connectDatabase, getAllDocuments } from '../../../utils/db-utils';

async function handler(req, res) {
  const { max, search } = req.query;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'GET') {
    try {
      let events = await getAllDocuments(client, 'events', { _id: -1 });

      if (search) {
        events = events.filter((event) => {
          const searchableText = `${event.title} ${event.description} ${event.location}`;
          return searchableText.toLowerCase().includes(search.toLowerCase());
        });
      }

      if (max) {
        events = events.slice(0, max);
      }

      res.status(200).json({ events: events });
    } catch (error) {
      res.status(500).json({ message: 'Getting events failed.' });
    }
  }
  client.close();
}

export default handler;
