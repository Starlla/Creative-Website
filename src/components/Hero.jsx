import { useEffect, useState } from 'react';
import Waveform from './Waveform.jsx';
import { heroWords } from '../data.js';

export default function Hero({ ready = true }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % heroWords.length), 3200);
    return () => clearInterval(id);
  }, [ready]);

  const word = heroWords[i];

  return (
    <section id="hero" className={`hero ${ready ? 'is-ready' : ''}`}>
      <p className="eyebrow reveal" style={{ '--d': '0ms' }}>A sharing platform for</p>
      <h1 className="hero-title" aria-label={word}>
        <span className="hero-word" key={word} aria-hidden="true">
          {word.split(' ').map((w, wi) => (
            <span key={wi} className="hero-chunk">
              {w.split('').map((ch, ci) => (
                <span key={ci} className="hero-letter" style={{ '--i': wi * 6 + ci }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>
      <p className="hero-sub reveal" style={{ '--d': '450ms' }}>
        Post your tracks, stems and sound design. Get heard by people who make music too, and get
        booked for the next session.
      </p>
      <div className="hero-actions reveal" style={{ '--d': '600ms' }}>
        <a href="#join" className="btn btn-primary">
          Claim your handle
        </a>
        <a href="#about" className="btn btn-ghost">
          What is Loophaus?
        </a>
      </div>

      <div className="hero-deck reveal" style={{ '--d': '750ms' }} aria-label="Example track on Loophaus">
        <div className="deck-meta mono">
          <span>NOW PLAYING · mira.wav — Night Bus to Ocean Beach</span>
          <span className="deck-tags">124 BPM · F♯m · −9.2 LUFS</span>
        </div>
        {ready && <Waveform bars={140} height={96} grow={1400} />}
        {!ready && <div style={{ height: 96 }} />}
      </div>
    </section>
  );
}
