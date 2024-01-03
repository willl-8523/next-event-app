// import fs from 'fs';
// import path from 'path';
import { connectDatabase, getAllDocuments } from '../../../utils/db-utils';

// export const filepath = path.resolve(path.join(process.cwd(), 'data'));

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
        console.log(search);
        events = events.filter((event) => {
          const searchableText = `${event.title} ${event.description} ${event.location}`;
          return searchableText.toLowerCase().includes(search.toLowerCase());
        });
      }

      if (max) {
        events = events.slice(events.length - max, events.length);
      }

      res.status(200).json({ events: events });
    } catch (error) {
      res.status(500).json({ message: 'Getting events failed.' });
    }
  }

  // try {
  //   const eventsFileContent = fs.readFileSync(
  //     filepath + '/events.json',
  //     'utf8'
  //   );

  //   let events = JSON.parse(eventsFileContent);

  //   if (search) {
  //     events = events.filter((event) => {
  //       const searchableText = `${event.title} ${event.description} ${event.location}`;
  //       return searchableText.toLowerCase().includes(search.toLowerCase());
  //     });
  //   }

  //   if (max) {
  //     events = events.slice(events.length - max, events.length);
  //   }

  //   res.json({
  //     events: events.map((event) => ({
  //       id: event.id,
  //       title: event.title,
  //       image: event.image,
  //       date: event.date,
  //       location: event.location,
  //     })),
  //   });
  // } catch (error) {
  //   console.error(`Erreur lors de la lecture du fichier : ${error.message}`);
  //   res.status(500).send('Erreur interne du serveur');
  // }

  client.close();
}

export default handler;
