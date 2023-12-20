import React, { Fragment, useEffect, useState } from 'react';
import NewEvent from '../../components/events/NewEvent';
import Home from '../../components/home-page/Home';
import { fetchImages, getAllEvents } from '../../utils/events-utils';
export default function NewEventPage(props) {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
    <Fragment>
      {isClient && <NewEvent imagesFetched={props.imagesFetched} />}
      <Home />
    </Fragment>
  );
}

export async function getStaticProps() {
  const images = await fetchImages();
  const events = await getAllEvents({ max: null, searchTerm: null });

  return {
    props: {
      imagesFetched: images,
      events
    },
  };
}
