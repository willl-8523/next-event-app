import EventItem from '../events/EventItem';
import ErrorBlock from '../ui/ErrorBlock';

export default function AllEvents({ events, error }) {
  let content;
  if (error) {
    content = <ErrorBlock title="An error occurred" message={error.message} />;
  }
  if (events) {
    content = (
      <ul className="events-list">
        {events.map((event) => (
          <li className="event-item" key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>All Events</h2>
      </header>
      {content}
    </section>
  );
}
