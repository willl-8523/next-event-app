import Link from 'next/link';
import EventDetails from '../../../components/events/EventDetail';
import {
  deleteEvent,
  fetchEvent,
  getAllEvents,
} from '../../../utils/events-utils';
import ErrorPage from '../../_error';
import { useState } from 'react';
import DeleteEvent from '../../../components/events/DeleteEvent';
import { useRouter } from 'next/router';

export default function EventDetailsPage({ event, error }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isError, setIsError] = useState(error);
  const router = useRouter();

  function handleStartDelete() {
    setShowDeleteModal(true);
  }

  function handleStopDelete() {
    setShowDeleteModal(false);
  }

  async function handleDelete() {
    try {
      setIsLoadingDelete(true);
      const response = await deleteEvent({ id: event.id });
      router.push('/');
      setIsLoadingDelete(false);
    } catch (error) {
      console.log(error);
      setIsError(error);
      setIsLoadingDelete(false);
    }
  }

  if (isError) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteEvent onStopDelete={handleStopDelete} onDelete={handleDelete} loadingDelete={isLoadingDelete} />
      )}
      <article id="event-details">
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link href={`/events/${event.id}/edit`}>Edit</Link>
          </nav>
        </header>
        <EventDetails event={event} />
      </article>
    </>
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
