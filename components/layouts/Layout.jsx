import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';
import Header from './Header';
import ModalContext from '../../store/modal-context';

export default function Layout(props) {
  const modalCtx = useContext(ModalContext);
  const router = useRouter();
  const pathId = router.query.eventId;

  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  useEffect(() => {
    modalCtx.setPath(router.pathname);
  }, [router]);

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
      <Header>{content}</Header>
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
