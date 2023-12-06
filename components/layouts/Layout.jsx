import React, { Fragment } from 'react';
import Header from './Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout(props) {
  const router = useRouter();
  const pathId = router.query.eventId;
  let content = (
    <Link legacyBehavior href="/events/new-event">
      <a className="button">New Event</a>
    </Link>
  );
  if (pathId) {
    content = (
      <Link legacyBehavior href="/events">
        <a className="nav-item">View All Events</a>
      </Link>
    );
  }
  return (
    <Fragment>
      <Header>
        {content}
      </Header>
      <main>{props.children}</main>
    </Fragment>
  );
}
