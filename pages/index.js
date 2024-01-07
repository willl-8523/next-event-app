import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Home from '../components/home-page/Home';
import { getAllEvents } from '../utils/events-utils';
import useEvents from '../hooks/use-events';
import ErrorBlock from '../components/ui/ErrorBlock';
import LoadingIndicator from '../components/ui/LoadingIndicator';

export default function HomePage({ events }) {
  const [updateEvents, setUpdateEvents] = useState(events);
  const { data, loading, error } = useEvents({ id: '', url: '/api/events' });

  useEffect(() => {
    if (data) {
      const dataEvents = data.events.map((item) => ({
        id: item._id,
        ...item,
      }));
      setUpdateEvents(dataEvents.slice(0, 4));
    }
  }, [data]);

  if (error) {
    return (
      <ErrorBlock
        title="Failed to create event"
        message={
          error.info?.message || 'Failed to load event. Please try again later'
        }
      />
    );
  }

  if (!data && !updateEvents) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Head>
        <title>Event App</title>
        <meta
          name="description"
          content="Find or add a lot of great events that allow to evolve"
        />
      </Head>
      <Home lastEvents={updateEvents} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents({ max: 4, searchTerm: null });

  if (!events) {
    return {
      notFound: true,
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
