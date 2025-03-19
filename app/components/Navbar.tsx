'use client'

import { useState } from "react";
import Link from "next/link";
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <div className={styles["navbar-logo"]}>
          <div className={styles['image-frame']}>
            <img className={styles.image} src="/Trust.png" alt="MedCare Logo" />
          </div>
          <p className={styles.logoText}>MedCare</p>
        </div>

        {/* Desktop Navigation Links */}
        <div className={styles["navbar-links"]}>
          <Link className={styles.link} href="/home">Home</Link>
          <Link className={styles.link} href="/appointment">Appointments</Link>
          <Link className={styles.link} href="#">Health Blog</Link>
          <Link className={styles.link} href="#">Reviews</Link>
        </div>
      </div>

      {/* Desktop Auth Buttons */}
      <div className={styles.authButtons}>
        <Link href="/login">
          <button className={styles.login}>Login</button>
        </Link>
        <Link href="/signup">
          <button className={styles.register}>Register</button>
        </Link>
      </div>

      {/* Hamburger Menu Icon - Only visible on mobile */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu (shown when hamburger is clicked) */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
        <Link className={styles.mobileLink} href="/home">Home</Link>
        <Link className={styles.mobileLink} href="/appointment">Appointments</Link>
        <Link className={styles.mobileLink} href="#">Health Blog</Link>
        <Link className={styles.mobileLink} href="#">Reviews</Link>
        <div className={styles.mobileAuth}>
          <Link href="/login">
            <button className={styles.login}>Login</button>
          </Link>
          <Link href="/signup">
            <button className={styles.register}>Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;