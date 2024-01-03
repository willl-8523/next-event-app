import { readFileSync, writeFileSync } from 'fs';
import { filepath } from '.';

async function handler(req, res) {
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
      return res.status(400).json({ message: 'Invalid data provided.' });
    }

    const eventsFileContent = readFileSync(
      filepath + '/events.json',
      'utf8'
    );
    const events = JSON.parse(eventsFileContent);
    const newEvent = {
      id: Math.round(Math.random() * 10000) + new Date().toISOString(),
      ...event,
    };
    events.push(newEvent);
    writeFileSync(
      filepath + '/events.json',
      JSON.stringify(events),
      'utf-8'
    );

    res.setHeader('Content-Type', 'application/json');
    res.json({ event: newEvent });
  }
}

export default handler;
