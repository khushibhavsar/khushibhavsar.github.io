// ============================================================
// Projects.jsx
// Showcase of featured projects with hover animations and
// a leaf decoration that blooms on hover.
// ============================================================

import React, { useEffect, useRef } from 'react';
import '../styles/sections.css';

// ── Project data ─────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'inspira',
    title: 'Inspira',
    subtitle: 'Creative Platform',
    icon: '🎨',
    bandClass: 'project-card__band--inspira',
    description:
      'A platform designed to empower artists of all levels — from beginners discovering their style to professionals sharing their craft. Inspira bridges creativity and community.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    link: 'https://inspira-nine.vercel.app/',
    linkLabel: 'View Project',
  },
  {
    id: 'bloom',
    title: 'Bloom Quest',
    subtitle: 'Adventure Game · p5.js',
    icon: '🌱',
    bandClass: 'project-card__band--bloom',
    description:
      'A fast-paced adventure game where a seed navigates a vivid world — collecting water droplets to grow while dodging obstacles. Built entirely with p5.js for smooth, canvas-based gameplay.',
    tags: ['p5.js', 'JavaScript', 'Game Dev', 'Canvas'],
    link: 'https://github.com/khushibhavsar/bloom-quest',
    linkLabel: 'Play Game',
  },
];

// ── Reusable scroll-reveal hook ──────────────────────────────
const useReveal = (threshold = 0.12) => {
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

// ── Single project card ──────────────────────────────────────
const ProjectCard = ({ project, delay }) => {
  const cardRef = useReveal();

  return (
    <article
      ref={cardRef}
      className="project-card reveal-card"
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {/* Colour band */}
      <div className={`project-card__band ${project.bandClass}`} />

      {/* Leaf decoration (blooms on hover) */}
      <span className="project-card__leaf" aria-hidden="true">🍃</span>

      <div className="project-card__body">
        <div className="project-card__icon" role="img" aria-label={project.title}>
          {project.icon}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__desc">{project.description}</p>

        {/* Tech tags */}
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>

        {/* Link */}
        <a href={project.link} className="project-card__link" aria-label={`${project.linkLabel} – ${project.title}`}>
          {project.linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
};

// ── Projects section ─────────────────────────────────────────
const Projects = () => {
  const headRef = useReveal();

  return (
    <section id="projects" className="projects section">
      <div className="container">

        {/* Heading */}
        <div
          ref={headRef}
          className="reveal-card"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">Projects I've<br /><em style={{ fontStyle: 'italic' }}>grown</em></h2>
        </div>

        {/* Cards grid */}
        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </div>

      {/* Reveal toggle */}
      <style>{`
        .reveal-card.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;
