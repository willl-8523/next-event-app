import React from 'react';
import AllEvents from '../../components/events/AllEvents';
import { getAllEvents } from '../../utils/events-utils';

export default function AllEventsPage({ events }) {
  return <AllEvents events={events} />;
}

export async function getStaticProps() {
  const events = await getAllEvents({max: null, searchTerm: null});

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
