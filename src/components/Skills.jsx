// ============================================================
// Skills.jsx
// Displays skill groups in botanical-styled cards.
// Each skill pill grows on hover.
// ============================================================

import React, { useEffect, useRef } from 'react';
import '../styles/sections.css';

// ── Skill groups data ─────────────────────────────────────────
const SKILL_GROUPS = [
  {
    icon: '🌐',
    name: 'Coding Languages',
    items: ['Java', 'JavaScript', 'Python', 'HTML/CSS'],
  },
  {
    icon: '🎮',
    name: 'Frameworks & Libraries',
    items: ['p5.js', 'React', 'Bootstrap'],
  },
  {
    icon: '🛠️',
    name: 'Developer Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Arduino IDE', 'Replit'],
  },
  {
    icon: '💡',
    name: 'Design & Content Tools',
    items: ['Figma', 'UI/UX Design', 'Wordpress', 'Problem Canva', 'Adobe Photoshop', 'MS Office'],
  },
];

// Scroll-reveal hook
const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vis'); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

// ── Skill group card ──────────────────────────────────────────
const SkillGroup = ({ group, delay }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="skills__group skill-reveal"
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div className="skills__group-icon" role="img" aria-label={group.name}>{group.icon}</div>
      <h3 className="skills__group-name">{group.name}</h3>
      <div className="skills__items">
        {group.items.map((item) => (
          <span key={item} className="skills__item">{item}</span>
        ))}
      </div>
    </div>
  );
};

// ── Skills section ────────────────────────────────────────────
const Skills = () => {
  const headRef = useReveal();

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div
          ref={headRef}
          className="skill-reveal"
          style={{
            opacity: 0, transform: 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="section-label">Toolkit</span>
          <h2 className="section-title">Skills &<br /><em style={{ fontStyle: 'italic' }}>Technologies</em></h2>
        </div>

        <div className="skills__groups">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.name} group={group} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        .skill-reveal.vis {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Skills;
