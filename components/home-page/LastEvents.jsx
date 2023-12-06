import EventItem from '../events/EventItem';

const DUMMY_DATA = [
  {
    id: '218',
    title: 'Tech Meetup ',
    description: 'Does work!',
    date: '2023-11-30',
    time: '20:02',
    location: 'Some Street, 12345 Some Place',
    image: 'buzzing-city.jpg',
  },
  {
    id: '9456',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hac habitasse platea dictumst quisque sagittis purus. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum.',
    date: '2023-12-28',
    time: '18:14',
    location: 'Some Location',
    image: 'park.jpg',
  },
];

export default function LastEvents() {
  let content;

  if (DUMMY_DATA) {
    content = (
      <ul className="events-list">
        {DUMMY_DATA.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}