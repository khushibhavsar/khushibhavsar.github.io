// ============================================================
// Navbar.jsx
// Fixed navigation bar with smooth-scroll links, frosted-glass
// scroll effect, and a responsive hamburger menu on mobile.
// ============================================================

import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

// Navigation links – id must match the section's id attribute
const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Add background once user scrolls past 40 px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">

        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={handleLinkClick}>
          <span className="navbar__logo-leaf" aria-hidden="true">🌿</span>
          Khushi
        </a>

        {/* Desktop + mobile links */}
        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="navbar__link" onClick={handleLinkClick}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="navbar__cta" onClick={handleLinkClick}>
              Say Hello
            </a>
          </li>
        </ul>

        {/* Hamburger toggle (mobile only) */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
