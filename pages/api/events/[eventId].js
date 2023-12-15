import fs from 'node:fs/promises';
import { filepath } from '.';

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'PUT') {
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

    const eventsFileContent = await fs.readFile(filepath + '/events.json');
    const events = JSON.parse(eventsFileContent);

    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events[eventIndex] = {
      eventId,
      ...event,
    };

    await fs.writeFile(filepath + '/events.json', JSON.stringify(events));

      res.json({ event: events[eventIndex] });
  }

  if (req.method === 'DELETE') {
    const eventsFileContent = await fs.readFile(filepath + '/events.json');
    const events = JSON.parse(eventsFileContent);

    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events.splice(eventIndex, 1);

    await fs.writeFile(filepath + '/events.json', JSON.stringify(events));

    res.json({ message: 'Event deleted' });
  }

  const eventsData = await fs.readFile(filepath + '/events.json', 'utf8');
  const events = JSON.parse(eventsData);

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res
      .status(404)
      .json({ message: `No event could be found.` });
  }

  res.json({ event });
}

export default handler;
