import fs from 'fs';
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

    const eventsFileContent = fs.readFileSync(
      filepath + '/events.json',
      'utf8'
    );
    const events = JSON.parse(eventsFileContent);

    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events[eventIndex] = {
      eventId,
      ...event,
    };

    try {
      fs.writeFileSync(filepath + '/events.json', JSON.stringify(events), {
        flag: 'w',
      });
    } catch (error) {
      console.error(error);
    }

    res.json({ event: events[eventIndex] });
  }

  if (req.method === 'DELETE') {
    const eventsFileContent = fs.readFileSync(
      filepath + '/events.json',
      'utf-8'
    );
    const events = JSON.parse(eventsFileContent);

    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events.splice(eventIndex, 1);

    try {
      fs.writeFileSync(filepath + '/events.json', JSON.stringify(events), {
        flag: 'w',
      });
    } catch (error) {
      console.error(error);
    }

    res.json({ message: 'Event deleted' });
  }

  const eventsData = fs.readFileSync(filepath + '/events.json', 'utf8');
  const events = JSON.parse(eventsData);

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({ message: `No event could be found.` });
  }

  res.json({ event });
}

export default handler;
