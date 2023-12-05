import meetupImg from '../../public/images/meetup.jpg';
import Link from 'next/link';

export default function EventsIntroSection() {
  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${meetupImg.src})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p>Anyone can organize and join events on React Event!</p>
      <p>
        <Link legacyBehavior href="/events/new">
          <a className="button">Create your first event</a>
        </Link>
      </p>
    </section>
  );
}
