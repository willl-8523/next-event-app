import { readFileSync, writeFileSync } from 'fs';
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
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ message: 'Invalid data provided.' });
    }

    const eventsFileContent = readFileSync(filepath + '/events.json');
    const events = JSON.parse(eventsFileContent);

    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events[eventIndex] = {
      eventId,
      ...event,
    };

    writeFileSync(filepath + '/events.json', JSON.stringify(events), {
      flag: 'w',
    });

    res.setHeader('Content-Type', 'application/json');
    res.json({ event: events[eventIndex] });
  }

  if (req.method === 'DELETE') {
    const eventsFileContent = readFileSync(filepath + '/events.json');
    const events = JSON.parse(eventsFileContent);

    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events.splice(eventIndex, 1);

    writeFileSync(filepath + '/events.json', JSON.stringify(events), {
      flag: 'w',
    });

    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Event deleted' });
  }

  const eventsData = readFileSync(filepath + '/events.json', 'utf8');
  const events = JSON.parse(eventsData);

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(404).json({ message: `No event could be found.` });
  }

  res.setHeader('Content-Type', 'application/json');
  res.json({ event });
}

export default handler;
