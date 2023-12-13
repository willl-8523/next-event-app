import React from 'react';
import Home from '../components/home-page/Home';
import { getAllEvents } from '../utils/events-utils';

export default function HomePage({ events }) {
  return (
    <>
      <Home lastEvents={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents({ max: 4, searchTerm: null });

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
