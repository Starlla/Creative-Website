import { useState } from 'react';
import Waveform from './Waveform.jsx';
import { sampleTrack, whoFor } from '../data.js';

function TrackCard() {
  const [spins, setSpins] = useState(37);
  const [bump, setBump] = useState(false);
  const t = sampleTrack;

  const spin = () => {
    setSpins((n) => n + 1);
    setBump(true);
    setTimeout(() => setBump(false), 300);
  };

  return (
    <article className="track-card" aria-label={`Example post: ${t.title}`}>
      <header className="track-head">
        <div>
          <p className="track-artist mono">@{t.artist}</p>
          <h3 className="track-title">{t.title}</h3>
        </div>
        <span className="track-len mono">{t.length}</span>
      </header>

      <Waveform bars={64} height={56} seed={13} />

      <dl className="track-specs mono">
        <div><dt>Tempo</dt><dd>{t.bpm} BPM</dd></div>
        <div><dt>Key</dt><dd>{t.key}</dd></div>
        <div><dt>Loudness</dt><dd>{t.lufs} LUFS</dd></div>
      </dl>

      <ul className="stems" aria-label="Stems">
        {t.stems.map((s) => (
          <li key={s.name}>
            <span className="mono">{s.name}</span>
            <span className="meter" style={{ '--lvl': s.level }} aria-hidden="true" />
          </li>
        ))}
      </ul>

      <button className={`spin-btn ${bump ? 'bump' : ''}`} onClick={spin}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
        Give a spin
        <span className="spin-count mono">{spins}</span>
      </button>
    </article>
  );
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div className="about-copy">
          <h2 className="section-title">What's Loophaus?</h2>
          <p className="pronounce mono">Pronounced /ˈluːp.haʊs/</p>
          <p className="lede">
            A platform for producers, sound designers and labels to share their work, get credit
            for it, and find the people they'll make the next record with.
          </p>
          <p className="aside">
            Every post carries the details musicians actually care about: tempo, key, loudness and
            the stems underneath. Tap the button on the card to see how a spin works.
          </p>
        </div>
        <TrackCard />
      </div>

      <div className="who">
        <h2 className="section-title">Who's it for?</h2>
        <p className="who-sub">Anyone who has ever exported a file called <span className="mono">final_final_v7.wav</span></p>
        <ul className="chips">
          {whoFor.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
