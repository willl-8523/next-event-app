import React from 'react';
import EventDetails from '../../../components/events/EventDetail';
import EditEvent from '../../../components/events/EditEvent';

export default function EditEventPage() {
  return (
    <>
      <EditEvent />
      <EventDetails />
    </>
  );
}
