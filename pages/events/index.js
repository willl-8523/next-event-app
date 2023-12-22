import React from 'react';
import AllEvents from '../../components/events/AllEvents';
import { getAllEvents } from '../../utils/events-utils';

export default function AllEventsPage({ events, isError }) {
  return <AllEvents events={events} error={isError} />;
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
      events,
    },
    revalidate: 60,
  };
}
