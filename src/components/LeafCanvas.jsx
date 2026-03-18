// ============================================================
// LeafCanvas.jsx
// Renders animated leaves that float across the screen and
// gently react to mouse movement (parallax effect).
// Uses a <canvas> element for performance.
// ============================================================

import React, { useEffect, useRef } from 'react';
import '../styles/LeafCanvas.css';

// SVG path data for a simple leaf silhouette (drawn on canvas)
const LEAF_PATH =
  'M 0,-1 C 0.6,-0.8 1,-0.2 0.8,0.5 C 0.6,1 0,1.2 0,1 C 0,1.2 -0.6,1 -0.8,0.5 C -1,-0.2 -0.6,-0.8 0,-1 Z';

// Leaf colours sampled from the design palette
const LEAF_COLORS = [
  'rgba(143, 184, 120, ',   // sage
  'rgba(106, 158, 86, ',    // sage-mid
  'rgba(61, 122, 50, ',     // forest
  'rgba(200, 216, 180, ',   // sage-light
];

// ── Leaf class ───────────────────────────────────────────────
class Leaf {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true); // true = initialise anywhere on screen
  }

  // Randomise / reset a leaf's properties
  reset(initial = false) {
    const { width } = this.canvas;
    this.x = Math.random() * width;
    // If initial, start at random Y; otherwise start just above viewport
    this.y = initial ? Math.random() * this.canvas.height : -60;
    this.size = 14 + Math.random() * 22;
    this.speed = 0.4 + Math.random() * 0.7;         // fall speed
    this.drift = (Math.random() - 0.5) * 0.6;       // horizontal drift
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;   // rotation speed
    this.opacity = 0.12 + Math.random() * 0.22;
    this.colorBase = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    // Slight wobble
    this.wobbleAmp = Math.random() * 18;
    this.wobbleFreq = 0.015 + Math.random() * 0.02;
    this.wobbleOffset = Math.random() * Math.PI * 2;
  }

  // Update position
  update(time, mouse) {
    this.y += this.speed;
    this.x += this.drift + Math.sin(time * this.wobbleFreq + this.wobbleOffset) * 0.4;
    this.rotation += this.rotSpeed;

    // Subtle mouse parallax – leaves closer to cursor drift slightly
    if (mouse) {
      const dx = (mouse.x - this.canvas.width  / 2) * 0.0003;
      const dy = (mouse.y - this.canvas.height / 2) * 0.0003;
      this.x += dx * this.size * 0.5;
      this.y += dy * this.size * 0.5;
    }

    // Recycle when off-screen
    if (this.y > this.canvas.height + 80) this.reset();
    if (this.x < -80 || this.x > this.canvas.width + 80) this.reset();
  }

  // Draw on canvas context
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.size, this.size * 1.6);

    ctx.beginPath();
    // Simple leaf: two bezier curves forming an almond/leaf shape
    ctx.moveTo(0, -1);
    ctx.bezierCurveTo(0.6, -0.8, 1, 0, 0, 1);
    ctx.bezierCurveTo(-1, 0, -0.6, -0.8, 0, -1);
    ctx.closePath();

    ctx.fillStyle = `${this.colorBase}${this.opacity})`;
    ctx.fill();

    // Midrib line
    ctx.beginPath();
    ctx.moveTo(0, -1);
    ctx.lineTo(0, 1);
    ctx.strokeStyle = `${this.colorBase}${this.opacity * 0.6})`;
    ctx.lineWidth = 0.04;
    ctx.stroke();

    ctx.restore();
  }
}

// ── Component ────────────────────────────────────────────────
const LeafCanvas = () => {
  const canvasRef = useRef(null);
  const leavesRef = useRef([]);
  const mouseRef  = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const LEAF_COUNT = 28; // number of simultaneous leaves

    // ── Resize handler ───────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Mouse tracker ────────────────────────────────────────
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Spawn leaves ─────────────────────────────────────────
    leavesRef.current = Array.from({ length: LEAF_COUNT }, () => new Leaf(canvas));

    // ── Animation loop ───────────────────────────────────────
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      leavesRef.current.forEach((leaf) => {
        leaf.update(time, mouseRef.current);
        leaf.draw(ctx);
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="leaf-canvas" aria-hidden="true" />;
};

export default LeafCanvas;
