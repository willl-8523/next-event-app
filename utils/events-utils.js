export async function getAllEvents(max) {
  let url = 'http://localhost:3000/api/events';
  if (max) {
    url += '?max=' + max;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();
  let sortedEvents;

  if (max) {
    sortedEvents = events.reverse();
  } else {
    sortedEvents = events.sort((postA, postB) =>
      postA.date > postB.date ? -1 : 1
    );
  }

  return sortedEvents;
}

export async function fetchEvent(id) {
  const response = await fetch(`http://localhost:3000/api/events/${id}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}
