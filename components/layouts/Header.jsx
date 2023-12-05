import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import classes from './Header.module.css'

export default function Header({children}) {
  return (
    <>
      <header className={classes["main-header"]}>
        <Link legacyBehavior href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <nav>{children}</nav>
      </header>
    </>
  );
}
