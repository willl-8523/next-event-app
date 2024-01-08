import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import AllEvents from '../../components/events/AllEvents';
import { getAllEvents } from '../../utils/events-utils';
import useEvents from '../../hooks/use-events';

export default function AllEventsPage({ events, isError }) {
  const { data, loading, error } = useEvents({ id: '', url: '/api/events' });
  const [updatedEvents, setUpdatedEvents] = useState(events);

  useEffect(() => {
    if (data) {
      const dataEvents = data.events.map((item) => ({
        id: item._id,
        ...item,
      }));
      setUpdatedEvents(dataEvents);
    }
  }, [data]);

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find or add a lot of great events that allow to evolve..."
        />
      </Head>
      <AllEvents events={updatedEvents} error={isError} />
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
