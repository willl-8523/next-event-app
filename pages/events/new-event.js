import React, { Fragment, useContext, useEffect, useState } from 'react';
import NewEvent from '../../components/events/NewEvent';
import Home from '../../components/home-page/Home';
import { fetchImages, getAllEvents } from '../../utils/events-utils';
import ModalContext from '../../store/modal-context';
import AllEvents from '../../components/events/AllEvents';
import ErrorBlock from '../../components/ui/ErrorBlock';
import Head from 'next/head';

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

export async function getStaticProps() {
  let images = null;
  let events = null;
  let isError = null;

  try {
    images = await fetchImages();
    events = await getAllEvents({ max: null, searchTerm: null });
  } catch (error) {
    isError = error;
  }

  if (isError) {
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
    },
  };
}
