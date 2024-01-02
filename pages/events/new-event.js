import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import AllEvents from '../../components/events/AllEvents';
import EventForm from '../../components/events/EventForm';
import Home from '../../components/home-page/Home';
import ErrorBlock from '../../components/ui/ErrorBlock';
import Modal from '../../components/ui/Modal';
import ModalContext from '../../store/modal-context';
import NotificationContext from '../../store/notification-context';
import { getAllEventsLib, getImages } from '../../utils/events-lib';

export default function NewEventPage(props) {
  const modalCtx = useContext(ModalContext);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleSubmit(formData) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/events/new-event', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        setIsLoading(false);
      } else {
        setError();
        router.push('/');
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully added Event!',
          status: 'success',
        });
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>New Event</title>
        <meta name="description" content="Add new Event" />
      </Head>
      {isClient && !props.isError && (
        <>
          <Modal onClose={() => router.push('/')}>
            {error && (
              <ErrorBlock
                title="Failed to create event"
                message={
                  error.info?.message ||
                  'Failed to create event. Please check your inputs and try again later'
                }
              />
            )}
            <EventForm
              onSubmitEvent={handleSubmit}
              images={props.imagesFetched}
            >
              <>
                <Link legacyBehavior href={modalCtx.path}>
                  <a className="button-text">Cancel</a>
                </Link>
                <button type="submit" className="button" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Create'}
                </button>
              </>
            </EventForm>
          </Modal>
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
