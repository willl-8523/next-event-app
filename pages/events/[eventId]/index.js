import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import DeleteEvent from '../../../components/events/DeleteEvent';
import EventDetails from '../../../components/events/EventDetail';
import NotificationContext from '../../../store/notification-context';
import { getAllEvents, getEvent } from '../../../utils/events-utils';
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
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        setIsError(error);
        setIsLoading(false);
      } else {
        router.push('/');
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully deleted Event!',
          status: 'success',
        });
        setIsLoadingDelete(false);
      }
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
            <Link legacyBehavior href={`/events/edit/${event.id}`}>
              <a>Edit</a>
            </Link>
          </nav>
        </header>
        <EventDetails event={event} />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const events = await getAllEvents({ max: null, searchTerm: null });

  return {
    paths: events.map((event) => ({
      params: { eventId: event._id.toString() },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  let event = null;

  try {
    event = await getEvent(eventId);
  } catch (error) {
    console.error(error);
  }

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: {
        id: event._id.toString(),
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        image: event.image,
        location: event.location,
      },
    },
    revalidate: 1,
  };
}
