"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/status",{
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }

        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, [pathname]);
   // Run on route change

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/logout", {
        method: "post",
         credentials:"include"// Ensures session cookie is sent for logout
      });

      setIsAuthenticated(false);
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <div className={styles["navbar-logo"]}>
          <div className={styles["image-frame"]}>
            <img className={styles.image} src="/Trust.png" alt="MedCare Logo" />
          </div>
          <p className={styles.logoText}>MedCare</p>
        </div>

        {/* Desktop Navigation Links */}
        <div className={styles["navbar-links"]}>
          <Link className={styles.link} href="/home">
            Home
          </Link>
          <Link className={styles.link} href="/appointment">
            Appointments
          </Link>
          <Link className={styles.link} href="#">
            Health Blog
          </Link>
          <Link className={styles.link} href="#">
            Reviews
          </Link>
        </div>
      </div>

      {/* Desktop Auth Buttons */}
      <div className={styles.authButtons}>
        {isAuthenticated ? (
          <button className={styles.login} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link href="/signup">
              <button className={styles.register}>Register</button>
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu Icon - Only visible on mobile */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu (shown when hamburger is clicked) */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        <Link className={styles.mobileLink} href="/home">
          Home
        </Link>
        <Link className={styles.mobileLink} href="/appointment">
          Appointments
        </Link>
        <Link className={styles.mobileLink} href="#">
          Health Blog
        </Link>
        <Link className={styles.mobileLink} href="#">
          Reviews
        </Link>
        <div className={styles.mobileAuth}>
          {isAuthenticated ? (
            <button className={styles.login} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className={styles.login}>Login</button>
              </Link>
              <Link href="/signup">
                <button className={styles.register}>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
