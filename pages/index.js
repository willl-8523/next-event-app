import React from 'react';
import Home from '../components/home-page/Home';
import { getAllEvents } from '../utils/events-utils';
import Head from 'next/head';
import { getAllEventsLib } from '../utils/events-lib';

export default function HomePage({ events }) {
  return (
    <>
      <Head>
        <title>Event App</title>
        <meta
          name="description"
          content="Find or add a lot of great evetns that allow to evolve"
        />
      </Head>
      <Home lastEvents={events}/>
    </>
  );
}

export async function getStaticProps() {
  const events = getAllEventsLib({ max: 4, search: null });

  if (!events) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
