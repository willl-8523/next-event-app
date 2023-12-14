export default function EventDetails({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div id="event-details-content">
      <img src={`/images/${event.image}`} alt={event.title} />
      <div id="event-details-info">
        <div>
          <p id="event-details-location">{event.location}</p>
          <time dateTime={`Todo-DateT$Todo-Time`}>
            {formattedDate} @ {event.time}
          </time>
        </div>
        <p id="event-details-description">{event.description}</p>
      </div>
    </div>
  );
}
