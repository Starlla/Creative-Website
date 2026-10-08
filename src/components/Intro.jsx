import { useEffect, useState } from 'react';

// Full-screen loader: a spinning record, the wordmark rising letter by letter and a
// 0 → 100 counter. When it reaches 100 the panel wipes upward and calls onDone.
export default function Intro({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }
    const total = 1500;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(onDone, 750);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="intro-inner">
        <svg className="intro-record" viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="32" cy="32" r="21" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="32" cy="32" r="10" fill="var(--signal)" />
          <circle cx="32" cy="32" r="2" fill="var(--ink)" />
        </svg>
        <div className="intro-word">
          {'LOOPHAUS'.split('').map((ch, i) => (
            <span key={i} className="intro-letter" style={{ '--i': i }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="intro-meter">
          <span className="intro-bar" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <span className="intro-count mono">{String(count).padStart(3, '0')}</span>
      </div>
    </div>
  );
}
