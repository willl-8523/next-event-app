import { useRef, useState } from 'react';
import EventItem from '../events/EventItem';


export default function SearchEvent() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const DUMMY_DATA = null;

  let content = <p>Please enter a search term and to find events.</p>;

  if (DUMMY_DATA) {
    content = (
      <ul className="events-list">
        {DUMMY_DATA.map((event) => (
          <li key={event.id}>
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
      {content}
    </section>
  );
}
