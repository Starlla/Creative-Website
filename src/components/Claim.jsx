import { useEffect, useRef } from 'react';

// Pinned, scroll-driven statement modeled on creadevs' "Join many creatives…" block.
// Scroll progress (0 → 1) is written to a single CSS variable, --p; every letter and
// word works out its own state from it in CSS, so nothing re-renders while scrolling.
//   0.04–0.55  letters assemble one by one from scattered sizes, line after line
//   0.60–0.68  the tagline blurs into focus
//   0.80–0.92  every word tilts and flies toward the viewer, then fades out

const LINES = [
  { cls: 'l1', words: ['Join', '*many*', 'producers'] },
  { cls: 'l2', words: ['who', 'already'] },
  { cls: 'l3', words: ['claimed', 'their', 'handle,'] },
  { cls: 'l4', words: ['and', 'counting…'] },
];

// Small seeded random so the scatter looks random but is the same every render.
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function buildLines() {
  const total = LINES.reduce((n, l) => n + l.words.join('').replace(/\*/g, '').length, 0);
  const r = rng(11);
  let i = 0;
  return LINES.map((line) => ({
    ...line,
    words: line.words.map((raw) => {
      const em = raw.startsWith('*');
      const text = raw.replace(/\*/g, '');
      const sign = r() > 0.5 ? 1 : -1;
      return {
        text,
        em,
        exit: {
          '--rx': `${sign * (25 + r() * 30)}deg`,
          '--tz': `${300 + r() * 300}px`,
          '--tx': `${(r() - 0.5) * 180}px`,
        },
        chars: text.split('').map((ch) => {
          const t = 0.04 + (i++ / total) * 0.48 + (r() - 0.5) * 0.03;
          return {
            ch,
            style: {
              '--t': t.toFixed(3),
              '--s0': (0.2 + r() * 2).toFixed(2),
              '--dy': `${((r() - 0.5) * 1.2).toFixed(2)}em`,
            },
          };
        }),
      };
    }),
  }));
}

const BUILT = buildLines();

export default function Claim() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '0.7'); // fully assembled, tagline visible, no exit
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const run = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / run));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="claim" aria-label="Join many producers who already claimed their handle, and counting. Don't get left behind.">
      <div className="claim-sticky" aria-hidden="true">
        <div className="claim-text">
          {BUILT.map((line) => (
            <span key={line.cls} className={`claim-line ${line.cls}`}>
              {line.words.map((w) => (
                <span key={w.text} className={`cw ${w.em ? 'em' : ''}`} style={w.exit}>
                  {w.chars.map((c, ci) => (
                    <span key={ci} className="cc" style={c.style}>
                      {c.ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
          <span className="claim-tag">Don't get left behind</span>
        </div>
      </div>
    </section>
  );
}
