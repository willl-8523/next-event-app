import { useEffect, useRef, useState } from 'react';
import EventItem from '../events/EventItem';
import { getAllEvents } from '../../utils/events-utils';

export default function SearchEvent() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const [filteredEvents, setFilteredEvents] = useState([]);

  const fetchFileteredEvents = async () => {
    const filteredEventResponse = await getAllEvents(null, searchTerm);
    setFilteredEvents(filteredEventResponse);
  };

  // useEffect(() => {
  //   console.log('Rendering');
  //   if (searchElement.current.value) {
  //     const fetchFileteredEvents = async () => {
  //       const filteredEventResponse = await getAllEvents(null, searchTerm);
  //       setFilteredEvents(filteredEventResponse);
  //     };

  //     fetchFileteredEvents();
  //   }
  // }, [searchTerm]);

  let content = <p>Please enter a search term and to find events.</p>;

  if (filteredEvents.length !== 0) {
    content = (
      <ul className="events-list">
        {filteredEvents.map((event) => (
          <li className="event-item" key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchFileteredEvents();
    setSearchTerm(searchElement.current.value);
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
