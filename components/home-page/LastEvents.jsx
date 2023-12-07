import Link from 'next/link';
import EventItem from '../events/EventItem';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './LastEvents.module.css';

export default function LastEvents({ lastEvents }) {
  let content;

  if (lastEvents) {
    content = (
      <ul className="events-list">
        {lastEvents.map((event) => (
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
        <h2>Recently added events</h2>
      </header>
      {content}
      <Link legacyBehavior href="/events">
        <a className={classes['explore-events']}>
          <span>See All</span>
          <span className={classes.icon}>
            <ArrowRightIcon />
          </span>
        </a>
      </Link>
    </section>
  );
}
