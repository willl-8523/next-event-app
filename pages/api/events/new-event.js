import fs from 'node:fs/promises';
import { filepath } from '.';

async function handler(req, res) {
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
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const eventsFileContent = await fs.readFile(
    filepath + '/events.json',
    'utf8'
  );
  const events = JSON.parse(eventsFileContent);
  const newEvent = {
    id: Math.round(Math.random() * 10000) + new Date().toISOString(),
    ...event,
  };
  events.push(newEvent);
  await fs.writeFile(filepath + '/events.json', JSON.stringify(events));
  res.json({ event: newEvent });
}

export default handler;
