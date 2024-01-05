import { connectDatabase, getAllDocuments, getDocument } from './db-utils';
import { ObjectId } from 'mongodb';

export async function getAllEvents({ max, searchTerm }) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    throw Error('Failed to connect database');
  }

  try {
    let events = await getAllDocuments(client, 'events', { _id: -1 });

    if (searchTerm) {
      console.log(searchTerm);
      events = events.filter((event) => {
        const searchableText = `${event.title} ${event.description} ${event.location}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (max) {
      events = events.slice(events.length - max, events.length);
    }
    client.close();
    return events;
  } catch (error) {
    client.close();
    throw Error('Getting events failed.');
  }
}

export async function getEvent(eventId) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    throw Error('Failed to connect to database.');
  }

  try {
    const event = await getDocument(client, 'events', {
      _id: new ObjectId(eventId),
    });
    
    client.close();
    return event;
  } catch (error) {
    client.close();
    throw Error('Getting event failed.');
  }
}

// const API_URL = `/api/events`;

// export async function getAllEvents({ max, searchTerm }) {
//   let url = API_URL;

//   if (searchTerm && max) {
//     url += '?search=' + searchTerm + '&max=' + max;
//   } else if (searchTerm) {
//     url += '?search=' + searchTerm;
//   } else if (max) {
//     url += '?max=' + max;
//   }

//   const response = await fetch(url);

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the events');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   const { events } = await response.json();
//   let sortedEvents;

//   if (max) {
//     sortedEvents = events.reverse();
//   } else {
//     sortedEvents = events.sort((postA, postB) =>
//       postA.date > postB.date ? -1 : 1
//     );
//   }

//   return sortedEvents;
// }

// export async function fetchEvent(id) {
//   const response = await fetch(`${API_URL}/${id}`);

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the event');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   const { event } = await response.json();

//   return event;
// }

// export async function fetchImages() {
//   const response = await fetch(`${API_URL}/images`);

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the images');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   const { images } = await response.json();

//   return images;
// }

// export async function createNewEvent(eventData) {
//   const response = await fetch(`${API_URL}/new-event`, {
//     method: 'POST',
//     body: JSON.stringify(eventData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const error = new Error('An error occurred while creating the event');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   const { event } = await response.json();

//   return event;
// }

// export async function updateEvent({ id, event }) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({ id, ...event }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const error = new Error('An error occurred while updating the event');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   return response.json();
// }

// export async function deleteEvent({ id }) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     const error = new Error('An error occurred while deleting the event');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   return response.json();
// }
