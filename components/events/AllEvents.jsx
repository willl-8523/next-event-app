
import EventItem from '../events/EventItem';

export default function AllEvents({events}) {
  let content;

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
