import fs from 'fs';
import path from 'path';

const eventsDirectory = path.join(process.cwd(), 'data');
const createPath = (file) => path.join(eventsDirectory, file);

export function getAllEventsLib({ max, search }) {
  const filepath = createPath('events.json');
  const fileContent = fs.readFileSync(filepath, 'utf-8');

  let events = JSON.parse(fileContent);

  if (search) {
    events = events
      .filter((event) => {
        const searchableText = `${event.title} ${event.description} ${event.location}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      })
      .reverse();
  }

  if (max) {
    events = events.slice(events.length - max, events.length).reverse();
  }

  return events;
}

export function getEvent(eventId) {
  const events = getAllEventsLib({ max: null, search: null });

  const event = events.find((event) => event.id === eventId);

  return event;
}