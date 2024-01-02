import Head from 'next/head';
import React, { Fragment } from 'react';
import AllEvents from '../../components/events/AllEvents';
import { getAllEventsLib } from '../../utils/events-lib';


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

export async function getServerSideProps(context) {
  let events = null;
  let isError = null;

  try {
    events = await getAllEventsLib({ max: null, searchTerm: null });
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
      events,
    }
  };
}
