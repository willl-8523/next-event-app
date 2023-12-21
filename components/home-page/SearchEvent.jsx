import { useEffect, useRef, useState } from 'react';
import EventItem from '../events/EventItem';
import { getAllEvents } from '../../utils/events-utils';

export default function SearchEvent() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredEventsMessage, setFilteredEventsMessage] = useState(
    'Please enter a search term and to find events.'
  );

  let content = <p className="event-result">{filteredEventsMessage}</p>;

  const fetchFileteredEvents = async () => {
    try {
      const filteredEventResponse = await getAllEvents({
        max: null,
        searchTerm: searchTerm,
      });

      if (filteredEventResponse.length === 0) {
        setFilteredEventsMessage('Not result events');
      }
      setFilteredEvents(filteredEventResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm !== undefined) {
      fetchFileteredEvents();
    }
  }, [searchTerm]);

  if (filteredEvents.length > 0) {
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
    setSearchTerm(searchElement.current.value);
  }

  console.log('Content: ', content);

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
