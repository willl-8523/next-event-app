import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import EditEvent from '../../../components/events/EditEvent';
import EventDetails from '../../../components/events/EventDetail';
import ErrorPage from '../../_error';
import { getEvent, getImages, getAllEvents } from '../../../utils/events-utils';

export default function EditEventPage({ event, images, errorEventData }) {
  const [isClient, setIsClient] = useState(false);
  const [isError, setIsError] = useState(errorEventData);

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
        <meta
          name="description"
          content={`Edit ${event.description}`}
        />
      </Head>
      {isClient && <EditEvent images={images} event={event} />}
      <EventDetails event={event} error={isError} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { eventId } = params;

//   let eventData = null;
//   let errorEventData = null;
//   let images = null;

//   try {
//     eventData = getEvent(eventId);
//     images = getImages();
//   } catch (error) {
//     errorEventData = error.code;
//   }

//   if (!eventData) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       event: { eventData, images, errorEventData },
//     },
//   };
// }

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
