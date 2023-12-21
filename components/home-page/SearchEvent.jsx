import { useEffect, useRef, useState } from 'react';
import EventItem from '../events/EventItem';
import { getAllEvents } from '../../utils/events-utils';
import LoadingIndicator from '../ui/LoadingIndicator';

export default function SearchEvent() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEventsMessage, setFilteredEventsMessage] = useState(
    'Please enter a search term and to find events.'
  );

  let content = <p className="event-result">{filteredEventsMessage}</p>;

  const fetchFileteredEvents = async () => {
    setIsLoading(true);
    try {
      const filteredEventResponse = await getAllEvents({
        max: null,
        searchTerm: searchTerm,
      });

      if (filteredEventResponse.length === 0) {
        setFilteredEventsMessage('Not result events');
      }
      setFilteredEvents(filteredEventResponse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      {isLoading && <LoadingIndicator />}
      {!isLoading && content}
    </section>
  );
}
