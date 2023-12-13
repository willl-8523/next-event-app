import Link from 'next/link.js';
import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useRouter } from 'next/router.js';
import { createNewEvent } from '../../utils/events-utils.js';

export default function NewEvent({ imagesFetched }) {
  const router = useRouter();

  async function handleSubmit(formData) {
    const response = await createNewEvent(formData);

    console.log(router);
    router.push('/');
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
    </Modal>
  );
}
