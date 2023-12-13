import Link from 'next/link.js';
import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useRouter } from 'next/router.js';
import { createNewEvent } from '../../utils/events-utils.js';
import ErrorBlock from '../ui/ErrorBlock.jsx';
import { useState } from 'react';

export default function NewEvent({ imagesFetched }) {
  const router = useRouter();
  const [error, setError] = useState();

  async function handleSubmit(formData) {
    try {
      const newEvent = await createNewEvent(formData);

      router.push('/');
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Modal onClose={() => router.push('/')}>
      <EventForm onSubmit={handleSubmit} images={imagesFetched}>
        <>
          <Link legacyBehavior href="../">
            <a className="button-text">Cancel</a>
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
      {error && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later'
          }
        />
      )}
    </Modal>
  );
}
