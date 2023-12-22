import React from 'react';
import Home from '../components/home-page/Home';
import { getAllEvents } from '../utils/events-utils';
import Head from 'next/head';

export default function HomePage({ events, isError }) {
  return (
    <>
      <Head>
        <title>Event App</title>
        <meta
          name="description"
          content="Find or add a lot of great evetns that allow to evolve"
        />
      </Head>
      <Home lastEvents={events} error={isError} />
    </>
  );
}

export async function getStaticProps() {
  let events = null;
  let isError = null;

  try {
    events = await getAllEvents({ max: 4, searchTerm: null });
  } catch (error) {
    isError = error;
  }

  if (isError) {
    return {
      props: {
        isError: {
          message:
            isError.info?.message || 'Failed to fetch the latest events.',
        },
      },
    };
  }

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
