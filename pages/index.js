import React from 'react';
import Hero from '../components/home-page/Hero'
import LastEvents from '../components/home-page/LastEvents';
import SearchEvent from '../components/home-page/SearchEvent';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LastEvents />
      <SearchEvent />
    </>
  );
}
