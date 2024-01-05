import Head from 'next/head';
import React from 'react';
import Home from '../components/home-page/Home';
import { getAllEvents } from '../utils/events-utils';

export default function HomePage({ events }) {
  return (
    <>
      <Head>
        <title>Event App</title>
        <meta
          name="description"
          content="Find or add a lot of great events that allow to evolve"
        />
      </Head>
      <Home lastEvents={events} />
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
      events: (await events.reverse()).map((event) => ({
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
