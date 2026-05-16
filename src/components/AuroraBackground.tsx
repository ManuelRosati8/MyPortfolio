import React, { useEffect } from 'react';

const AuroraBackground = () => {
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      root.style.setProperty('--mx', String(e.clientX));
      root.style.setProperty('--my', String(e.clientY));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="aurora-blob blob-1" />
      <div className="aurora-blob blob-2" />
      <div className="aurora-blob blob-3" />
    </div>
  );
};

export default AuroraBackground;
