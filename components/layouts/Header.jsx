import React from 'react';
import Link from 'next/link';
import Logo from './logo';

export default function Header({children}) {
  return (
    <>
      <header id="main-header">
        <Link legacyBehavior href='/'>
          <a>
            <Logo />
          </a>
        </Link>
        <nav>{children}</nav>
      </header>
    </>
  );
}
