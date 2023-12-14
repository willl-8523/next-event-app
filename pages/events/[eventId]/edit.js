import React from 'react';
import EventDetails from '../../../components/events/EventDetail';
import EditEvent from '../../../components/events/EditEvent';
import { fetchImages, fetchEvent, getAllEvents } from '../../../utils/events-utils';

export default function EditEventPage({ images, event }) {
  return (
    <>
      <EditEvent images={images} event={event} />
      <EventDetails event={event} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;

  const eventData = await fetchEvent(eventId);
  const images = await fetchImages();

  return {
    props: {
      event: eventData,
      images: images,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents({ max: null, searchTerm: null });

  const eventIds = events.map((event) => event.id);

  return {
    paths: eventIds.map((id) => ({ params: { eventId: id } })),
    fallback: false,
  };
}
