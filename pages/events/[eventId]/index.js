import Link from 'next/link';
import EventDetails from '../../../components/events/EventDetail';
import { fetchEvent, getAllEvents } from '../../../utils/events-utils';
import ErrorPage from '../../_error';

export default function EventDetailsPage({ event, error }) {
  if (error) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <article id="event-details">
      <header>
        <h1>{event.title}</h1>
        <nav>
          <button>Delete</button>
          <Link href={`/events/${event.id}/edit`}>Edit</Link>
        </nav>
      </header>
      <EventDetails event={event} />
    </article>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;
  let eventData = null;
  let errorEventData = null;

  try {
    eventData = await fetchEvent(eventId);
  } catch (error) {
    errorEventData = error.code;
  }

  return {
    props: {
      event: eventData,
      error: errorEventData,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents({ max: null, searchTerm: null });

  const eventIds = events.map((event) => event.id);

  return {
    paths: eventIds.map((id) => ({ params: { eventId: id } })),
    fallback: 'blocking',
  };
}
