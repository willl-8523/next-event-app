import Link from 'next/link';

const DUMMY_DATA = {
  id: '218',
  title: 'Tech Meetup ',
  description: 'Does work!',
  date: '2023-11-30',
  time: '20:02',
  location: 'Some Street, 12345 Some Place',
  image: 'buzzing-city.jpg',
};

export default function EventDetails() {
  const formattedDate = new Date(DUMMY_DATA.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <article id="event-details">
        <header>
          <h1>{DUMMY_DATA.title}</h1>
          <nav>
            <button>Delete</button>
            <Link href="/edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`/images/${DUMMY_DATA.image}`} alt={DUMMY_DATA.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{DUMMY_DATA.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {DUMMY_DATA.time}
              </time>
            </div>
            <p id="event-details-description">{DUMMY_DATA.description}</p>
          </div>
        </div>
      </article>
    </>
  );
}
