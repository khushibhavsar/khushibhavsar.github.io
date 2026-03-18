// ============================================================
// Hero.jsx
// Full-viewport hero section with animated headline, floating
// SVG leaf decorations, and a parallax tilt on mouse move.
// ============================================================

import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';

// Leaf SVG rendered inline so we can animate it with CSS
const LeafSVG = ({ className }) => (
  <svg
    className={`hero__leaf ${className}`}
    viewBox="0 0 100 160"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    {/* Leaf body */}
    <path
      d="M50 8 C75 8 95 40 90 85 C85 125 65 152 50 152 C35 152 15 125 10 85 C5 40 25 8 50 8 Z"
      fill="#6a9e56"
    />
    {/* Midrib */}
    <line x1="50" y1="8" x2="50" y2="152" stroke="#3d7a32" strokeWidth="2.5" strokeLinecap="round" />
    {/* Veins */}
    <line x1="50" y1="50"  x2="78" y2="70"  stroke="#3d7a32" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="50" y1="75"  x2="22" y2="95"  stroke="#3d7a32" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="50" y1="100" x2="74" y2="118" stroke="#3d7a32" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const Hero = () => {
  const contentRef = useRef(null);

  // Subtle mouse-parallax on the content block
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * 4;
      const ry = (e.clientX / window.innerWidth  - 0.5) * -4;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const onMouseLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="hero section">
      {/* Background decorative ring */}
      <div className="hero__bg-ring" aria-hidden="true" />

      {/* Floating leaf decorations */}
      <LeafSVG className="hero__leaf--1" />
      <LeafSVG className="hero__leaf--2" />
      <LeafSVG className="hero__leaf--3" />
      <LeafSVG className="hero__leaf--4" />
      <LeafSVG className="hero__leaf--5" />

      <div className="container">
        <div
          className="hero__content"
          ref={contentRef}
          style={{ transition: 'transform 0.15s ease' }}
        >
          {/* Greeting pill */}
          <div className="hero__greeting">
            <span className="hero__greeting-icon" aria-hidden="true">👋</span>
            Hello, I'm
          </div>

          {/* Name headline */}
          <h1 className="hero__name">
            Khushi<br />
            <span className="hero__name-accent">Bhavsar</span>
          </h1>

          {/* Tagline */}
          <p className="hero__tagline">
            I'm a Grade 12 student passionate about{' '}
            <strong>software engineering</strong>,{' '}
            <strong>computer science</strong>, and{' '}
            <strong>entrepreneurship</strong>. I enjoy collaborating
             with others to make building web apps and creative coding projects.
          </p>

          {/* CTAs */}
          <div className="hero__cta-row">
            <a href="#projects" className="btn-primary">
              See My Work
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn-ghost">
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
