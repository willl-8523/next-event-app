export default function EventDetails({ date, image, title, location, time, description }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div id="event-details-content">
      <img src={`/images/${image}`} alt={title} />
      <div id="event-details-info">
        <div>
          <p id="event-details-location">{location}</p>
          <time dateTime={`Todo-DateT$Todo-Time`}>
            {formattedDate} @ {time}
          </time>
        </div>
        <p id="event-details-description">{description}</p>
      </div>
    </div>
  );
}
