import Modal from '../ui/Modal.jsx';
import EventForm from './EventForm.jsx';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';

const DUMMY_UPDATED_DATA = {
  id: '9454',
  title: 'Lorem ipsum dolor sit amet.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hac habitasse platea dictumst quisque sagittis purus. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum.',
  date: '2023-12-28',
  time: '18:14',
  location: 'Some Location',
  image: 'park.jpg',
};

export default function EditEvent() {
  const router = useRouter();

  function handleSubmit(formData) {
    e.preventDefault();

    console.log('Updated Event');
  }

  function handleClose() {
    // navigate('../');
    router.push(`/events/${DUMMY_UPDATED_DATA.id}`);
  }

  let content;

  if (DUMMY_UPDATED_DATA) {
    content = (
      <EventForm inputData={DUMMY_UPDATED_DATA} onSubmit={handleSubmit}>
        <>
          <Link
            legacyBehavior
            href={`/events/${DUMMY_UPDATED_DATA.id}`}
            className="button-text"
          >
            <a className="button-text">Cancel</a>
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
