import { useContext, useState } from 'react';
import { updateEvent } from '../../utils/events-utils.js';
import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';
import ErrorBlock from '../ui/ErrorBlock.jsx';
import NotificationContext from '../../store/notification-context.js';

export default function EditEvent({ images, event }) {
  const router = useRouter();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  

  async function handleSubmit(formData) {
    try {
      setIsLoading(true);
      const newEvent = await updateEvent({ id: event.id, event: formData });
      router.push(`/events/${event.id}`);
      setIsLoading(false);
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully updated Event!',
        status: 'success',
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  function handleClose() {
    router.push(`/events/${event.id}`);
  }

  let content;

  if (event) {
    content = (
      <>
        {error && (
          <>
            <ErrorBlock
              title="Failed to update event"
              message={
                error.info?.message ||
                'Failed to update event. Please check your inputs and try again later'
              }
            />
          </>
        )}
        <EventForm inputData={event} onSubmit={handleSubmit} images={images}>
          <>
            <Link
              legacyBehavior
              href={`/events/${event.id}`}
              className="button-text"
            >
              <a className="button-text">Cancel</a>
            </Link>
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </>
        </EventForm>
      </>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
