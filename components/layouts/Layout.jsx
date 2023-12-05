import React, { Fragment } from 'react';
import Header from './Header';
import Link from 'next/link';

export default function Layout(props) {
  return (
    <Fragment>
      <Header>
        <Link legacyBehavior href="/events/new">
          <a className="button">New Event</a>
        </Link>
      </Header>
      <main>{props.children}</main>
    </Fragment>
  );
}
