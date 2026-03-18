// ============================================================
// Footer.jsx
// Simple footer matching the dark contact section.
// ============================================================

import React from 'react';
import '../styles/sections.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <p className="footer__copy">
        © {new Date().getFullYear()} Khushi Bhavsar. All rights reserved.
      </p>
      <p className="footer__love">
        Made with <span aria-label="love">💚</span>
      </p>
    </div>
  </footer>
);

export default Footer;
