// ============================================================
// Contact.jsx
// Dark forest-toned contact section with social links and a
// giant decorative leaf watermark.
// ============================================================

import React, { useEffect, useRef } from 'react';
import '../styles/sections.css';

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('ct-vis'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
};

// ── Social / contact links ────────────────────────────────────
const LINKS = [
  {
    label: 'Send an Email',
    href: 'mailto:bhavsarkhushi08@gmail.com',   // ← replace with real email
    cls: 'contact__link--email',
    icon: '✉️',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/khushibhavsar',          // ← replace with real GitHub URL
    cls: 'contact__link--github',
    icon: (
      // Simple GitHub mark SVG
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.79.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/khushi-bhavsar/',         // ← replace with real LinkedIn URL
    cls: 'contact__link--linkedin',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const ref = useReveal();

  return (
    <section id="contact" className="contact section">
      {/* Giant leaf watermark */}
      <svg
        className="contact__leaf-bg"
        viewBox="0 0 200 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M100 10 C160 10 195 70 185 160 C175 240 140 310 100 310 C60 310 25 240 15 160 C5 70 40 10 100 10 Z"
          fill="#c8d8b4"
        />
        <line x1="100" y1="10" x2="100" y2="310" stroke="#8fb878" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="container">
        <div
          ref={ref}
          className="ct-reveal"
          style={{
            opacity: 0, transform: 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's grow<br /><em style={{ fontStyle: 'italic' }}>something together</em></h2>
          <p className="contact__tagline">
            Whether you'd like to collaborate on a project, talk about anything tech related,
            or just say hello — I'd be happy to chat!
          </p>

          <div className="contact__links">
            {LINKS.map(({ label, href, cls, icon }) => (
              <a
                key={label}
                href={href}
                className={`contact__link ${cls}`}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ct-reveal.ct-vis {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;
