import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import EditEvent from '../../../components/events/EditEvent';
import EventDetails from '../../../components/events/EventDetail';
import {
  fetchEvent,
  fetchImages
} from '../../../utils/events-utils';
import ErrorPage from '../../_error';

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

export async function getServerSideProps(context) {
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