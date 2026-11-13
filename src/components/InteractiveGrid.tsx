import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

type RGB = [number, number, number];

const PALETTES = {
  dark: {
    cellFill: 'rgba(255, 255, 255, 0.035)',
    cellStroke: 'rgba(255, 255, 255, 0.075)',
    outer: [124, 45, 18] as RGB,
    mid: [234, 88, 12] as RGB,
    inner: [251, 146, 60] as RGB,
    maxAlpha: 0.92,
  },
  light: {
    cellFill: 'rgba(24, 24, 27, 0.045)',
    cellStroke: 'rgba(24, 24, 27, 0.08)',
    outer: [154, 52, 18] as RGB,
    mid: [234, 88, 12] as RGB,
    inner: [249, 115, 22] as RGB,
    maxAlpha: 0.62,
  },
};

const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

const glowColor = (outer: RGB, mid: RGB, inner: RGB, t: number): RGB => {
  if (t < 0.5) return mix(outer, mid, t * 2);
  return mix(mid, inner, (t - 0.5) * 2);
};

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
};

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    strength: 0.35,
    targetStrength: 0.35,
    initialized: false,
  });
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette = PALETTES[theme];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseCanvas = document.createElement('canvas');
    const baseCtx = baseCanvas.getContext('2d');
    const pointer = pointerRef.current;

    let width = 1;
    let height = 1;
    let cellSize = 44;
    let gap = 6;
    let step = 50;
    let offsetX = 0;
    let offsetY = 0;
    let columns = 1;
    let rows = 1;
    let glowRadius = 260;
    let rafId = 0;
    let running = false;
    let lastClient: { x: number; y: number } | null = null;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      baseCanvas.width = canvas.width;
      baseCanvas.height = canvas.height;
      if (baseCtx) baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellSize = width < 640 ? 32 : width < 1024 ? 42 : 48;
      gap = width < 640 ? 5 : 6;
      step = cellSize + gap;
      columns = Math.max(1, Math.floor((width + gap) / step));
      rows = Math.max(1, Math.floor((height + gap) / step));

      const gridWidth = columns * cellSize + (columns - 1) * gap;
      const gridHeight = rows * cellSize + (rows - 1) * gap;
      offsetX = (width - gridWidth) / 2;
      offsetY = (height - gridHeight) / 2;
      glowRadius = width < 640 ? 190 : Math.max(220, Math.min(340, width * 0.24));

      if (!pointer.initialized) {
        pointer.x = pointer.targetX = width / 2;
        pointer.y = pointer.targetY = height / 2;
        pointer.initialized = true;
      } else {
        pointer.x = Math.min(Math.max(pointer.x, 0), width);
        pointer.y = Math.min(Math.max(pointer.y, 0), height);
        pointer.targetX = Math.min(Math.max(pointer.targetX, 0), width);
        pointer.targetY = Math.min(Math.max(pointer.targetY, 0), height);
      }
    };

    const rebuildBase = () => {
      if (!baseCtx) return;

      baseCtx.clearRect(0, 0, width, height);
      baseCtx.fillStyle = palette.cellFill;
      baseCtx.strokeStyle = palette.cellStroke;
      baseCtx.lineWidth = 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = offsetX + col * step;
          const y = offsetY + row * step;
          roundedRect(baseCtx, x, y, cellSize, cellSize, 4);
          baseCtx.fill();
          baseCtx.stroke();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(baseCanvas, 0, 0, width, height);

      const strength = pointer.strength;
      if (strength <= 0.01) return;

      const radius = glowRadius;
      for (let row = 0; row < rows; row++) {
        const centerY = offsetY + row * step + cellSize / 2;
        const dy = centerY - pointer.y;
        if (Math.abs(dy) > radius) continue;

        for (let col = 0; col < columns; col++) {
          const centerX = offsetX + col * step + cellSize / 2;
          const dx = centerX - pointer.x;
          const distance = Math.hypot(dx, dy);
          if (distance > radius) continue;

          const falloff = 1 - distance / radius;
          const eased = falloff * falloff * (3 - 2 * falloff);
          const core = Math.max(0, 1 - distance / (radius * 0.34));
          const heat = Math.min(1, eased * 0.82 + core * 0.18 + 0.04);
          const [r, g, b] = glowColor(palette.outer, palette.mid, palette.inner, heat);
          const alpha = Math.min(palette.maxAlpha, strength * (0.06 + eased * 0.94));
          const size = cellSize * (1 + eased * 0.08);
          const offset = (cellSize - size) / 2;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          roundedRect(
            ctx,
            offsetX + col * step + offset,
            offsetY + row * step + offset,
            size,
            size,
            Math.max(2, 4 * (size / cellSize)),
          );
          ctx.fill();
        }
      }
    };

    const animate = () => {
      if (!running) return;
      pointer.x += (pointer.targetX - pointer.x) * 0.16;
      pointer.y += (pointer.targetY - pointer.y) * 0.16;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.1;
      draw();
      rafId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      rafId = requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const updatePointer = (clientX: number, clientY: number, inside: boolean) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (inside && x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.targetX = x;
        pointer.targetY = y;
        pointer.targetStrength = 1;
      } else {
        pointer.targetStrength = 0.15;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastClient = { x: event.clientX, y: event.clientY };
      updatePointer(event.clientX, event.clientY, true);
    };

    const handlePointerDown = (event: PointerEvent) => {
      lastClient = { x: event.clientX, y: event.clientY };
      updatePointer(event.clientX, event.clientY, true);
      pointer.strength = Math.max(pointer.strength, 0.65);
    };

    const handleLeave = () => {
      pointer.targetStrength = 0;
    };

    const handleScroll = () => {
      if (lastClient) updatePointer(lastClient.x, lastClient.y, true);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      rebuildBase();
      if (reducedMotion || !running) draw();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(container);

    measure();
    rebuildBase();

    if (reducedMotion) {
      pointer.x = pointer.targetX = width / 2;
      pointer.y = pointer.targetY = height / 2;
      pointer.strength = 0.28;
      draw();
    } else {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('blur', handleLeave);
      document.addEventListener('mouseleave', handleLeave);
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleLeave);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hero-grid pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default InteractiveGrid;
