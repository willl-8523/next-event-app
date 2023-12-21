import Link from 'next/link.js';
import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useRouter } from 'next/router.js';
import { createNewEvent } from '../../utils/events-utils.js';
import ErrorBlock from '../ui/ErrorBlock.jsx';
import { useContext, useState } from 'react';
import NotificationContext from '../../store/notification-context.js';
import ModalContext from '../../store/modal-context.js';

export default function NewEvent({ imagesFetched }) {
  const modalCtx = useContext(ModalContext);
  const router = useRouter();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  async function handleSubmit(formData) {
    try {
      setIsLoading(true);
      const newEvent = await createNewEvent(formData);
      router.push('/');
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully added Event!',
        status: 'success',
      });
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  return (
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
      <EventForm onSubmit={handleSubmit} images={imagesFetched}>
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
  );
}
