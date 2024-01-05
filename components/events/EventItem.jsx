import Link from "next/link";


export default function EventItem({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <article>
      <img src={`/images/${event.image}`} alt={event.title} />
      <div className="event-item-content">
        <div>
          <h2>{event.title}</h2>
          <p className="event-item-date">{formattedDate}</p>
          <p className="event-item-location">{event.location}</p>
        </div>
        <p>
          <Link legacyBehavior href={`/events/${event._id}`}>
            <a className="button">View Details</a>
          </Link>
        </p>
      </div>
    </article>
  );
}
