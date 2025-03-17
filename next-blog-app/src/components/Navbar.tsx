'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Blog
      </Link>
      <div className="container">
        <Link href="/" className="logo">
          Next.js Blog
        </Link>
        <nav>
          <Link href="/" className="nav-link">
            Home
          </Link>
        </nav>
      </div>
    </nav>
  );
} 