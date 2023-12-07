export async function getAllEvents(max) {
  /**
   * Signal is to set the default parameter sent by usequery
   */

  let url = 'http://localhost:3000/api/events';

  // if (searchTerm && max) {
  //   url += '?search=' + searchTerm + '&max=' + max;
  // } else if (searchTerm) {
  //   url += '?search=' + searchTerm;
  // } else if (max) {
  //   url += '?max=' + max;
  // }
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
