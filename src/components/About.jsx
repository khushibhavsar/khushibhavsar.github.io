// ============================================================
// About.jsx
// "About Me" section. Clicking an interest chip swaps the
// image shown inside the card. A placeholder is shown by
// default until a chip is selected.
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import '../styles/sections.css';

// ── Scroll-reveal hook ────────────────────────────────────────
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

// ── Interest chips ────────────────────────────────────────────
// Each chip has:
//   label – text shown on the chip
//   emoji – decorative icon
//   image – path to image in /public/about/ folder
//           e.g. put "webdev.jpg" in public/about/ and it will load
//   alt   – accessible alt text
const INTERESTS = [
  {
    label: 'Web Development',
    emoji: '👩‍💻',
    image: process.env.PUBLIC_URL + '/assets/inspira.png',
    alt:   'Web Development',
  },
  {
    label: 'Painting',
    emoji: '🎨',
    image: process.env.PUBLIC_URL + '/assets/painting.jpeg',
    alt:   'Painting',
  },
  {
    label: 'Digital Art',
    emoji: '⚡',
    image: process.env.PUBLIC_URL + '/assets/IMG_3362.JPG',
    alt:   'Digital Art',
  },
  {
    label: 'Entrepreneurship',
    emoji: '🚀',
    image: process.env.PUBLIC_URL + '/assets/products.png',
    alt:   'Entrepreneurship',
  },
  {
    label: 'Game Dev',
    emoji: '🎮',
    image: process.env.PUBLIC_URL + '/assets/bloomquest.png',
    alt:   'Game Development',
  },
  {
    label: 'Baking',
    emoji: '👩‍🍳',
    image: process.env.PUBLIC_URL + '/assets/cookies.jpg',
    alt:   'Baking',
  },
];

// ── Component ─────────────────────────────────────────────────
const About = () => {
  // null = no chip selected (shows placeholder)
  const [selected, setSelected] = useState(null);

  const leftRef  = useReveal();
  const rightRef = useReveal();

  const active = selected !== null ? INTERESTS[selected] : null;

  // Clicking the same chip again deselects (back to placeholder)
  const handleChipClick = (index) => {
    setSelected(prev => prev === index ? null : index);
  };

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__grid">

          {/* ── Left: text + chips ─────────────────────────── */}
          <div
            ref={leftRef}
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
            className="about__text reveal-el"
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title">Building things<br /><em>with purpose</em></h2>

            <div className="about__body">
              <p>
                Hi! I'm <strong>Khushi Bhavsar</strong>, a Grade 12 student passionate about using technology to solve real-world problems and bring creative ideas to life. I'm especially interested in the intersection of <strong>software, design, and entrepreneurship</strong>.
              </p>
              <p>
                I enjoy building <strong>web applications</strong> that are both functional and engaging; from interactive games using p5.js to full platforms designed to empower creators. For me, every project is an opportunity to experiment, learn, and improve as a developer.
              </p>
              <p>
                Beyond coding, I'm always exploring new ideas in entrepreneurship and kickstarting 
                my own business selling digital prints. Feel free to check out{' '}
                  <a
                  href="https://www.instagram.com/madeby._.kb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--clr-forest)',
                    fontWeight: '500',
                    borderBottom: '1.5px solid var(--clr-sage)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                    onMouseEnter={e => { e.target.style.color = 'var(--clr-forest-deep)'; e.target.style.borderColor = 'var(--clr-forest-deep)'; }}
                    onMouseLeave={e => { e.target.style.color = 'var(--clr-forest)'; e.target.style.borderColor = 'var(--clr-sage)'; }}
                  >
                    @madeby._.kb
                  </a>{' '}
                  on Instagram for more information!
              </p>
            </div>

            {/* Hint text */}
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--clr-text-muted)',
              marginTop: 'var(--space-lg)',
              marginBottom: 'var(--space-sm)',
              letterSpacing: '0.04em',
            }}>
              Tap an interest to explore →
            </p>

            {/* Chips */}
            <div className="about__chips">
              {INTERESTS.map((interest, i) => (
                <button
                  key={interest.label}
                  className={`about__chip about__chip--btn ${selected === i ? 'about__chip--active' : ''}`}
                  onClick={() => handleChipClick(i)}
                  aria-pressed={selected === i}
                >
                  {interest.emoji} {interest.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: image card ──────────────────────────── */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            }}
            className="about__visual reveal-el"
          >
            <div className="about__card about__card--image">

              {/* Leaf watermark behind image */}
              <svg
                className="about__card-leaf-bg"
                viewBox="0 0 360 360"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {[...Array(6)].map((_, i) => (
                  <ellipse
                    key={i}
                    cx={60 + (i % 3) * 120}
                    cy={80 + Math.floor(i / 3) * 180}
                    rx="38" ry="65"
                    fill="#3d7a32"
                    transform={`rotate(${i * 30 - 15}, ${60 + (i % 3) * 120}, ${80 + Math.floor(i / 3) * 180})`}
                  />
                ))}
              </svg>

              {/* Image area */}
              <div className="about__card-img-wrap">
                {active && (
                  <img
                    key={active.image}
                    src={active.image}
                    alt={active.alt}
                    className="about__card-img about__card-img--fade"
                    onError={(e) => {
                      // If image file isn't added yet, fall back to placeholder
                      e.target.style.display = 'none';
                      document.getElementById('about-placeholder').style.display = 'flex';
                    }}
                  />
                )}

                {/* Placeholder shown when no chip selected */}
                <div
                  id="about-placeholder"
                  className="about__card-placeholder"
                  style={{ display: active ? 'none' : 'flex' }}
                >
                  <img
                    src={process.env.PUBLIC_URL + '/assets/me.jpg'}
                    alt="Placeholder leaf"
                    className="about__card-img"
                  />
                </div>
                public/
                └── assets/
                    └── me.jpg
              </div>

              {/* Caption bar */}
              <div className="about__card-caption">
                {active ? (
                  <>
                    <span className="about__card-caption-emoji">{active.emoji}</span>
                    <span className="about__card-caption-label">{active.label}</span>
                  </>
                ) : (
                  <span className="about__card-caption-label" style={{ color: 'var(--clr-text-muted)' }}>
                    Me competiting at Deca Provincials!
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .reveal-el.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Card layout */
        .about__card--image {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Fixed aspect-ratio image box */
        .about__card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--clr-parchment);
          overflow: hidden;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          flex-shrink: 0;
        }

        .about__card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @keyframes imgFadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .about__card-img--fade {
          animation: imgFadeIn 0.45s ease both;
        }

        /* Placeholder */
        .about__card-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: var(--clr-parchment);
        }

        .about__card-placeholder-icon {
          font-size: 3rem;
          display: block;
          animation: leafSway 3s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .about__card-placeholder-text {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          text-align: center;
          line-height: 1.6;
        }

        /* Caption bar */
        .about__card-caption {
          padding: 0.9rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-top: 1px solid var(--clr-sand);
          background: var(--clr-white);
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          min-height: 52px;
        }

        .about__card-caption-emoji { font-size: 1.1rem; }
        .about__card-caption-label {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--clr-text);
        }

        /* Chip button */
        .about__chip--btn {
          cursor: pointer;
          font-family: var(--font-body);
          transition: background 0.2s, color 0.2s, transform 0.2s var(--ease-spring), box-shadow 0.2s;
        }
        .about__chip--btn:hover {
          transform: translateY(-2px);
          background: rgba(143, 184, 120, 0.3);
        }

        /* Active chip */
        .about__chip--active {
          background: var(--clr-forest-deep) !important;
          color: var(--clr-cream) !important;
          border-color: var(--clr-forest-deep) !important;
          box-shadow: 0 4px 14px rgba(45, 90, 39, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default About;