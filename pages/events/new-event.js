import React, { Fragment, useContext, useEffect, useState } from 'react';
import NewEvent from '../../components/events/NewEvent';
import Home from '../../components/home-page/Home';
import { fetchImages, getAllEvents } from '../../utils/events-utils';
import ModalContext from '../../store/modal-context';
import AllEvents from '../../components/events/AllEvents';

export default function NewEventPage(props) {
  const modalCtx = useContext(ModalContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let outlet;
  if (modalCtx.path === '/') {
    outlet = <Home />;
  }
  if (modalCtx.path === '/events') {
    outlet = <AllEvents events={props.events} />;
  }

  return (
    <Fragment>
      {isClient && <NewEvent imagesFetched={props.imagesFetched} />}
      {outlet}
    </Fragment>
  );
}

export async function getStaticProps() {
  const images = await fetchImages();
  const events = await getAllEvents({ max: null, searchTerm: null });

  return {
    props: {
      imagesFetched: images,
      events,
    },
  };
}
