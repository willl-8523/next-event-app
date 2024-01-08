import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import EditEvent from '../../../components/events/EditEvent';
import EventDetails from '../../../components/events/EventDetail';
import { getAllEvents, getEvent, getImages } from '../../../utils/events-utils';
import ErrorPage from '../../_error';
import useEvents from '../../../hooks/use-events';

export default function EditEventPage({ event, images, errorEventData }) {
  const [isClient, setIsClient] = useState(false);
  const [isError, setIsError] = useState(errorEventData);
  const [updatedEvent, setUpdatedEvent] = useState(event);

  const { data, loading, error } = useEvents({
    id: event.id,
    url: '/api/events',
  });

  useEffect(() => {
    if (data) {
      setUpdatedEvent(data.event[0]);
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isError) {
    return <ErrorPage statusCode={errorEventData} />;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={`Edit ${updatedEvent.description}`} />
      </Head>
      {isClient && <EditEvent images={images} event={updatedEvent} />}
      <EventDetails event={updatedEvent} error={isError} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { editId } = params;

  let eventData = null;
  let errorEventData = null;
  let images = null;

  try {
    eventData = await getEvent(editId);
    images = getImages();
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
      event: {
        id: eventData._id.toString(),
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        image: eventData.image,
        location: eventData.location,
      },
      images,
      errorEventData,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents({ max: null, searchTerm: null });

  return {
    paths: (await events).map((event) => ({
      params: { editId: event._id.toString() },
    })),
    fallback: 'blocking',
  };
}
