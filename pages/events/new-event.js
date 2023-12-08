import React, { Fragment, useEffect, useState } from 'react';
import NewEvent from '../../components/events/NewEvent';
import Home from '../../components/home-page/Home';
import { fetchImages } from '../../utils/events-utils';

export default function NewEventPage(props) {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Fragment>
      {isClient && <NewEvent imagesFetched={props.imagesFetched} />}
      <Home />
    </Fragment>
  );
}

export async function getStaticProps() {
  const images = await fetchImages();

  return {
    props: {
      imagesFetched: images,
    },
  };
}
