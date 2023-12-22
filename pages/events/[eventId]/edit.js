import React, { useEffect, useState } from 'react';
import EventDetails from '../../../components/events/EventDetail';
import EditEvent from '../../../components/events/EditEvent';
import {
  fetchImages,
  fetchEvent,
  getAllEvents,
} from '../../../utils/events-utils';
import ErrorPage from '../../_error';
import Head from 'next/head';

export default function EditEventPage({ event }) {
  const [isClient, setIsClient] = useState(false);
  const [isError, setIsError] = useState(event.error);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isError) {
    return <ErrorPage statusCode={event.error} />;
  }

  return (
    <>
      <Head>
        <title>{event.eventData.title}</title>
        <meta
          name="description"
          content={`Edit ${event.eventData.description}`}
        />
      </Head>
      {isClient && <EditEvent images={event.images} event={event.eventData} />}
      <EventDetails event={event.eventData} error={isError} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;

  let eventData = null;
  let errorEventData = null;
  let images = null;

  try {
    eventData = await fetchEvent(eventId);
    images = await fetchImages();
  } catch (error) {
    errorEventData = error.code;
  }

  if (!eventData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: { eventData, images, errorEventData },
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
