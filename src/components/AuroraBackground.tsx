import React, { useEffect, useRef } from 'react';

/*
 * AuroraBackground — Sfondo dinamico con effetto aurora/nebulosa spaziale
 *
 * COME FUNZIONA:
 * - 3 div con gradienti radiali arancioni fortemente sfocati (blur 90-120px)
 * - Ogni blob insegue il mouse con un ritardo diverso (lag), creando
 *   un effetto parallasse che dà profondità spaziale
 * - Blob 1 (grande): il più lento, sembra lontano e massiccio
 * - Blob 2 (medio): velocità intermedia
 * - Blob 3 (piccolo): il più reattivo, sembra vicino al cursore
 * - Ogni blob ha un offset spaziale fisso (frazione della viewport) per
 *   non sovrapporsi mai completamente — crea una "costellazione" attorno al mouse
 *
 * TECNICA:
 * - requestAnimationFrame (rAF) chiama lerp() per interpolare la posizione
 *   attuale di ogni blob verso il suo target (posizione mouse + offset)
 * - lerp (Linear Interpolation) = a + (b - a) * t
 *   Più t è basso, più il movimento è lento e "morbido"
 * - La posizione viene scritta direttamente sul DOM tramite ref
 *   (el.style.transform) senza causare re-render di React
 * - 6 operazioni lerp per frame + 3 assegnamenti style → trascurabile
 * - Supporta prefers-reduced-motion: se attivo, i blob restano fermi
 * - I blob partono dal centro schermo per apparire subito (no scatto da 0,0)
 */

/*
 * Configurazione dei 3 blob: velocità e scala
 * Offset rimosso — ogni blob è centrato esattamente sul cursore.
 * Il parallasse (profondità) è creato dalle diverse velocità lerp:
 * il blob lento (speed basso) rimane indietro quando il mouse si muove,
 * quello veloce lo segue quasi istantaneamente.
 */
const BLOB_CONFIG = [
  {
    // Blob 1: il più grande e lento → effetto "massa planetaria" lontana
    speed: 0.025,       // Fattore lerp (0.025 = si sposta del 2.5% verso il target ogni frame)
    scale: 1.0,
  },
  {
    // Blob 2: medio → strato intermedio
    speed: 0.05,
    scale: 0.85,
  },
  {
    // Blob 3: il più piccolo e reattivo → sembra "vicino" al cursore
    speed: 0.09,
    scale: 0.7,
  },
];

const AuroraBackground = () => {
  // Ref diretti ai 3 elementi DOM — permettono di modificare transform
  // senza passare da React (zero re-render, massima performance)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Posizione corrente di ogni blob {x, y} — aggiornata ogni frame via lerp
  const positions = useRef(BLOB_CONFIG.map(() => ({ x: 0, y: 0 })));

  // Posizione target per ogni blob (mouse + offset spaziale)
  const targets = useRef(BLOB_CONFIG.map(() => ({ x: 0, y: 0 })));

  // Flag: true dopo il primo setup iniziale
  const initialized = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /*
     * onMouseMove — chiamato a ogni movimento del mouse (con passive: true
     * per non bloccare lo scroll). Salva la posizione del mouse come target
     * per tutti e 3 i blob (nessun offset — sono centrati sul cursore).
     */
    const onMouseMove = (e: MouseEvent) => {
      targets.current = BLOB_CONFIG.map(() => ({
        x: e.clientX,
        y: e.clientY,
      }));
    };

    if (!prefersReduced) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    /*
     * lerp (Linear Interpolation) — interpolazione lineare
     * Formula: a + (b - a) * t
     * Restituisce un valore intermedio tra a (posizione attuale) e b (target)
     * t=0 → resta su a, t=1 → arriva istantaneamente a b
     * t piccolo (0.025) → movimento lento e organico (easing implicito)
     */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /*
     * animate — loop principale eseguito dal browser a ~60fps
     * Per ogni blob: calcola nuova posizione con lerp, applica transform
     * Usa i ref DOM per scrivere direttamente lo stile (no re-render React)
     */
    let rafId = 0;
    const animate = () => {
      const pos = positions.current;
      const tgt = targets.current;

      for (let i = 0; i < BLOB_CONFIG.length; i++) {
        const cfg = BLOB_CONFIG[i];
        // Interpola X e Y separatamente verso il target
        pos[i].x = lerp(pos[i].x, tgt[i].x, cfg.speed);
        pos[i].y = lerp(pos[i].y, tgt[i].y, cfg.speed);

        // Scrittura diretta sul DOM: nessun re-render React
        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate(${pos[i].x}px, ${pos[i].y}px) scale(${cfg.scale})`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    /*
     * Inizializzazione: posiziona tutti i blob al centro schermo
     * così appaiono subito visibili invece di "scattare" da (0,0)
     */
    if (!initialized.current) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      for (let i = 0; i < BLOB_CONFIG.length; i++) {
        positions.current[i] = { x: cx, y: cy };
        targets.current[i] = { x: cx, y: cy };
      }
      initialized.current = true;
    }

    // Avvia il loop
    rafId = requestAnimationFrame(animate);

    // Cleanup: rimuove listener e ferma rAF quando il componente viene smontato
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BLOB_CONFIG.map((_, i) => (
        <div
          key={i}
          /* ref callback: salva il riferimento DOM nell'array per accesso diretto */
          ref={(el) => { blobRefs.current[i] = el; }}
          /*
           * Classi CSS per lo stile del blob:
           * - aurora-blob: stile base (absolute, arrotondato, blur, will-change)
           * - blob-1/2/3: dimensioni e colore specifici
           */
          className={`aurora-blob blob-${i + 1}`}
        />
      ))}
    </div>
  );
};

export default AuroraBackground;
