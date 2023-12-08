import Link from 'next/link.js';
import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useRouter } from 'next/router.js';

export default function NewEvent({ imagesFetched }) {
  const router = useRouter();
  function handleSubmit(formData) {
    console.log('Submitted');
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
