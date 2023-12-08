import fs from 'node:fs/promises';
import path from 'node:path';

export const filepath = path.join(process.cwd(), 'data');

async function handler(req, res) {
  const { max } = req.query;

  try {
    const eventsFileContent = await fs.readFile(
      filepath + '/events.json',
      'utf8'
    );

    let events = JSON.parse(eventsFileContent);

    if (max) {
      events = events.slice(events.length - max, events.length);
    }

    res.json({
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        image: event.image,
        date: event.date,
        location: event.location,
      })),
    });
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier : ${error.message}`);
    res.status(500).send('Erreur interne du serveur');
  }
}

export default handler;
