const API_URL = 'http://localhost:3000/api/events';

export async function getAllEvents(max) {
  let url = API_URL;
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
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchImages() {
  const response = await fetch(`${API_URL}/images`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}
