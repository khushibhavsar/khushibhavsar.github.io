// ============================================================
// Experience.jsx
// Vertical timeline of academic and project experience.
// Leaf-shaped bullets animate on hover.
// ============================================================

import React, { useEffect, useRef } from 'react';
import '../styles/sections.css';

// ── Experience data ───────────────────────────────────────────
const EXPERIENCE = [
  {
    period: '2024 – Present',
    role: 'Web Developer',
    org: 'Superposition Toronto',
    description:
      'Monitored website performance and resolved 15+ technical or content issues, ensuring consistent functionality, accessibility, and up-to-date information for the organization’s community and events.',
  },
  {
    period: '2022 - 2026',
    role: 'Lead Programmer',
    org: 'Tech Under Twenty',
    description:
      'Developed and maintained the Tech Under Twenty website by implementing 10+ responsive design and functionality improvements, ensuring a user-friendly experience and reliable performance for 500+ youth visitors exploring technology opportunities.',
  },
  {
    period: '2023 – 2024',
    role: 'Promotion Associate',
    org: 'Marketyze',
    description:
      'Engaged with 100+ community members by responding to user inquiries and crafting 25+ Instagram captions for Marketyze’s social media, helping promote internships, competitions, and workshops to 1,000+ youth worldwide and contributing to increased audience engagement.',
  },
  {
    period: '2022 – 2023',
    role: 'Graphic Designer Intern',
    org: 'Girl Genius',
    description:
      'Produced 10+ editorial illustrations per issue for the Girl Genius STEAM magazine, transforming article themes into visually engaging graphics that enhanced readability and supported the organization’s mission of empowering young female leaders in science and technology.',
  },
];

// Scroll-reveal hook
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('exp-vis'); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

// ── Experience section ────────────────────────────────────────
const Experience = () => {
  const headRef = useReveal();

  return (
    <section id="experience" className="experience section">
      <div className="container">
        {/* Heading */}
        <div
          ref={headRef}
          className="exp-reveal"
          style={{
            opacity: 0, transform: 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-title">Experience &<br /><em style={{ fontStyle: 'italic' }}>Growth</em></h2>
        </div>

        {/* Timeline */}
        <div className="experience__timeline">
          {EXPERIENCE.map((item, i) => {
            // Each item gets its own ref for staggered reveal
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemRef = useReveal(0.1);
            return (
              <div
                key={i}
                ref={itemRef}
                className="experience__item exp-reveal"
                style={{
                  opacity: 0,
                  transform: 'translateX(-20px)',
                  transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
                }}
              >
                {/* Leaf-shaped bullet */}
                <div className="experience__dot" aria-hidden="true" />

                <p className="experience__period">{item.period}</p>
                <h3 className="experience__role">{item.role}</h3>
                <p className="experience__org">{item.org}</p>
                <p className="experience__desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .exp-reveal.exp-vis {
          opacity: 1 !important;
          transform: translate(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Experience;
