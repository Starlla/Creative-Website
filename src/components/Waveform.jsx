import { useEffect, useRef } from 'react';

// Animated waveform drawn on canvas. Bars left of the playhead are "played"
// (accent), bars to the right are dim. Static when reduced motion is preferred.
export default function Waveform({ bars = 120, height = 120, playing = true, seed = 7, grow = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Deterministic pseudo-random amplitudes so the shape reads like a real track.
    let s = seed;
    const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const amps = Array.from({ length: bars }, (_, i) => {
      const section = Math.sin((i / bars) * Math.PI * 3) * 0.25 + 0.6;
      const kick = i % 8 === 0 ? 0.25 : 0;
      return Math.min(1, section * (0.45 + rand() * 0.55) + kick);
    });

    const styles = getComputedStyle(document.documentElement);
    const played = styles.getPropertyValue('--signal').trim() || '#fd746c';
    const rest = styles.getPropertyValue('--wave-rest').trim() || '#3a3950';

    let raf;
    let start = performance.now();

    const draw = (now) => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = height;
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const t = reduce || !playing ? 0.42 : ((now - start) / 14000) % 1;
      const gap = 2;
      const bw = Math.max(1.5, w / bars - gap);
      amps.forEach((a, i) => {
        const x = i * (bw + gap);
        const wobble = reduce || !playing ? 1 : 0.88 + 0.12 * Math.sin(now / 180 + i * 0.7);
        // Intro: bars grow out from the center over `grow` ms.
        let g = 1;
        if (grow && !reduce) {
          const fromCenter = Math.abs(i - bars / 2) / (bars / 2);
          const p = Math.min(1, Math.max(0, (now - start - fromCenter * grow * 0.5) / (grow * 0.5)));
          g = 1 - Math.pow(1 - p, 3);
        }
        const bh = Math.max(3 * g, a * wobble * g * (h - 8));
        ctx.fillStyle = i / bars < t ? played : rest;
        const y = (h - bh) / 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, bw, bh, bw / 2) : ctx.rect(x, y, bw, bh);
        ctx.fill();
      });

      if (!reduce && playing) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    const onResize = () => requestAnimationFrame(draw);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [bars, height, playing, seed, grow]);

  return (
    <canvas
      ref={canvasRef}
      className="waveform"
      style={{ height }}
      aria-hidden="true"
    />
  );
}
