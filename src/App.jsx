// ============================================================
// App.jsx
// Root component — composes all sections and the leaf canvas.
// ============================================================

import React from 'react';

// Global styles (must be imported before component styles)
import './styles/globals.css';

// Animated leaf background canvas
import LeafCanvas from './components/LeafCanvas';

// Page sections
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Projects   from './components/Projects';
import Skills     from './components/Skills';
import Experience from './components/Experience';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

const App = () => (
  <>
    {/* Floating leaf canvas sits behind everything */}
    <LeafCanvas />

    {/* Fixed navigation */}
    <Navbar />

    {/* Page content */}
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>

    <Footer />
  </>
);

export default App;
