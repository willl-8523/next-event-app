import fs from 'node:fs/promises';
import path from 'node:path';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const filepath = path.join(process.cwd(), 'data');

  const eventsData = await fs.readFile(filepath + '/events.json', 'utf8');
  const events = JSON.parse(eventsData);

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no event could be found.` });
  }

  res.json({ event });
}

export default handler;
