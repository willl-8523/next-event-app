import fs from 'node:fs/promises';
import path from 'node:path';

async function handler(req, res) {
  const filepath = path.join(process.cwd(), 'data');
//   const { max, search } = req.query;
  const { max } = req.query;

  try {
    const eventsFileContent = await fs.readFile(
      filepath + '/events.json',
      'utf8'
    );

    let events = JSON.parse(eventsFileContent);

    // if (search) {
    //   events = events.filter((event) => {
    //     const searchableText = `${event.title} ${event.description} ${event.location}`;
    //     return searchableText.toLowerCase().includes(search.toLowerCase());
    //   });
    // }

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
