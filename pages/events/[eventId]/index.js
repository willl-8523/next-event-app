import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import DeleteEvent from '../../../components/events/DeleteEvent';
import EventDetails from '../../../components/events/EventDetail';
import NotificationContext from '../../../store/notification-context';
import {
  deleteEvent,
  fetchEvent,
} from '../../../utils/events-utils';
import ErrorPage from '../../_error';

export default function EventDetailsPage({ event, error }) {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isError, setIsError] = useState(error);

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
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully deleted Event!',
        status: 'success',
      });
      setIsLoadingDelete(false);
    } catch (error) {
      setIsError(error);
      setIsLoadingDelete(false);
    }
  }

  if (isError) {
    return <ErrorPage statusCode={error} />;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

      {showDeleteModal && (
        <DeleteEvent
          onStopDelete={handleStopDelete}
          onDelete={handleDelete}
          loadingDelete={isLoadingDelete}
        />
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

export async function getServerSideProps(context) {
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