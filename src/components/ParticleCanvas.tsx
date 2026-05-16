import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const NODE_COUNT = 40;
const GRID_COLS = 8;
const GRID_ROWS = 5;
const CONNECTION_DIST = 160;
const ATTRACT_DIST = 300;
const REPEL_DIST = 60;
const SPARK_COUNT = 8;
const TRAIL_LENGTH = 16;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef(0);
  const { theme } = useTheme();
  const prefersReduced = useRef(false);

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];
    const cellW = w / (GRID_COLS + 1);
    const cellH = h / (GRID_ROWS + 1);
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const bx = cellW * (col + 1) + (Math.random() - 0.5) * cellW * 0.5;
        const by = cellH * (row + 1) + (Math.random() - 0.5) * cellH * 0.5;
        if (nodes.length < NODE_COUNT) {
          nodes.push({ x: bx, y: by, vx: 0, vy: 0, baseX: bx, baseY: by });
        }
      }
    }
    return nodes;
  }, []);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodesRef.current = initNodes(canvas.width, canvas.height);
      trailRef.current = [];
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      mouseRef.current = { x: mx, y: my };
      const trail = trailRef.current;
      trail.push({ x: mx, y: my });
      while (trail.length > TRAIL_LENGTH) trail.shift();
    };
    window.addEventListener('mousemove', onMouse);

    const dark = theme === 'dark';
    const dotColor = '249,115,22';
    const lineColor = dark ? '255,255,255' : '23,23,23';
    const sparkColor = '249,115,22';

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const trail = trailRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReduced.current) {
          const dx = mx - n.x;
          const dy = my - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < ATTRACT_DIST && dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            if (dist < REPEL_DIST) {
              const force = (1 - dist / REPEL_DIST) * 1.2;
              n.vx -= nx * force;
              n.vy -= ny * force;
            } else {
              const force = (1 - dist / ATTRACT_DIST) * 0.15;
              n.vx += nx * force;
              n.vy += ny * force;
            }
          }

          n.vx += (n.baseX - n.x) * 0.006;
          n.vy += (n.baseY - n.y) * 0.006;
          n.vx *= 0.94;
          n.vy *= 0.94;
          n.x += n.vx;
          n.y += n.vy;
        }

        const dx2 = mx - n.x;
        const dy2 = my - n.y;
        const distToMouse = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const glowAlpha = Math.max(0, 1 - distToMouse / ATTRACT_DIST) * (dark ? 0.45 : 0.3);

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 + glowAlpha * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor},${0.07 + glowAlpha * 0.8})`;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * (dark ? 0.06 : 0.04);
            const da = Math.sqrt((mx - a.x) ** 2 + (my - a.y) ** 2);
            const db = Math.sqrt((mx - b.x) ** 2 + (my - b.y) ** 2);
            const mouseBoost = Math.max(0, 1 - Math.min(da, db) / ATTRACT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineColor},${alpha + mouseBoost})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      for (let s = 0; s < SPARK_COUNT; s++) {
        const offset = Math.round((s / SPARK_COUNT) * TRAIL_LENGTH * 0.7);
        const idx = trail.length - 1 - offset;
        if (idx < 0) continue;
        const p = trail[idx];
        const size = 2.5 - (s / SPARK_COUNT) * 1.8;
        const alpha = 0.55 - (s / SPARK_COUNT) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sparkColor},${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [theme, initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleCanvas;
