import Head from 'next/head';
import React, { Fragment } from 'react';
import AllEvents from '../../components/events/AllEvents';
import { getAllEvents } from '../../utils/events-utils';

export default function AllEventsPage({ events, isError }) {
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find or add a lot of great events that allow to evolve..."
        />
      </Head>
      <AllEvents events={events} error={isError} />
    </Fragment>
  );
}

export async function getStaticProps() {
  let events = null;
  let isError = null;

  try {
    events = await getAllEvents({ max: null, searchTerm: null });
  } catch (error) {
    isError = error;
  }

  if (isError) {
    return {
      props: {
        isError: {
          message: isError.info?.message || 'Failed to fetch the all events.',
        },
      },
    };
  }

  return {
    props: {
      events: (await events).map((event) => ({
        id: event._id.toString(),
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        image: event.image,
        location: event.location,
      })),
    },
    revalidate: 1,
  };
}
