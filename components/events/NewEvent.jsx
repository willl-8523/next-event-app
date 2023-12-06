import Link from 'next/link.js';
import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';

export default function NewEvent() {
  function handleSubmit(formData) {
    console.log('Submitted');
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
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
