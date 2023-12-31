import React from 'react';
import Hero from './Hero';
import LastEvents from './LastEvents';
import SearchEvent from './SearchEvent';

export default function Home({ lastEvents, error }) {
  return (
    <>
      <Hero />
      <LastEvents lastEvents={lastEvents} error={error} />
      <SearchEvent />
    </>
  );
}
