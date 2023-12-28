import Head from 'next/head';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import AllEvents from '../../components/events/AllEvents';
import NewEvent from '../../components/events/NewEvent';
import Home from '../../components/home-page/Home';
import ErrorBlock from '../../components/ui/ErrorBlock';
import ModalContext from '../../store/modal-context';
import { getAllEventsLib, getImages } from '../../utils/events-lib';

export default function NewEventPage(props) {
  const modalCtx = useContext(ModalContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let outlet;
  if (modalCtx.path === '/') {
    outlet = <Home lastEvents={props.lastEvents} />;
  }
  if (modalCtx.path === '/events') {
    outlet = <AllEvents events={props.events} />;
  }

  return (
    <Fragment>
      <Head>
        <title>New Event</title>
        <meta name="description" content="Add new Event" />
      </Head>
      {isClient && !props.isError && (
        <>
          <NewEvent imagesFetched={props.imagesFetched} />
          {outlet}
        </>
      )}
      {isClient && props.isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            props.isError.info?.message ||
            'Something went wrong to create event.'
          }
        />
      )}
    </Fragment>
  );
}

export async function getServerSideProps() {
  let images = getImages();
  const events = getAllEventsLib({ max: null, search: null });
  const lastEvents = getAllEventsLib({ max: 4, search: null });
  let isError = null;

  if (!images || !events || !lastEvents) {
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
      imagesFetched: images,
      events,
      lastEvents,
    },
  };
}
