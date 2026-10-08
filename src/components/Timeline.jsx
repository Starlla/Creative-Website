import { timeline } from '../data.js';
import SplitChars from './SplitChars.jsx';
import useInView from './useInView.js';

// Modeled on creadevs' timeline: a coral→violet dashed track, coral checked dots for
// finished stages, an "Active" pill with pulsing rings, outlined dots for what's next.
// Stages pop in one after another when the track scrolls into view.

const STATUS = { done: 'completed', active: 'active', next: 'upcoming' };

function Check() {
  return (
    <svg className="tl-check" viewBox="0 0 15 15" aria-hidden="true">
      <path
        d="M13.05 3.2a.78.78 0 0 1 0 1.1l-6.87 6.88a.78.78 0 0 1-1.1 0L1.95 8.05a.78.78 0 1 1 1.1-1.1L5.63 9.52l6.32-6.32a.78.78 0 0 1 1.1 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Timeline() {
  const [headRef, headIn] = useInView(0.4);
  const [trackRef, trackIn] = useInView(0.35);

  return (
    <section id="timeline" className="timeline">
      <div ref={headRef} className="timeline-head">
        <SplitChars as="h2" lines={['Timeline']} on={headIn} label="Timeline" className="timeline-title" />
        <p className="timeline-sub">
          We're building a new home for producers. <a href="#join">Join us</a>
        </p>
      </div>

      <div ref={trackRef} className={`tl ${trackIn ? 'tl-on' : ''}`}>
        <svg className="tl-dash" viewBox="0 0 1000 10" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="tlDash" x1="0" y1="5" x2="1000" y2="5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--signal)" />
              <stop offset="100%" stopColor="var(--violet)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="5" x2="1000" y2="5" stroke="url(#tlDash)" strokeWidth="3" strokeDasharray="4 4" />
        </svg>

        <ol className="tl-list">
        {timeline.map((step, i) => {
          const status = STATUS[step.status];
          return (
            <li key={step.label} className={`tl-stage is-${status}`} style={{ '--i': i }}>
              {status === 'active' ? (
                <span className="tl-pill">
                  <span className="tl-marker">
                    <span className="tl-ripple" />
                    <span className="tl-ripple" />
                    <Check />
                  </span>
                  <span className="tl-badge">Active</span>
                </span>
              ) : (
                <span className="tl-marker">{status === 'completed' && <Check />}</span>
              )}
              <span className="tl-label">
                {step.label.split('\n').map((part, j) => (
                  <span key={j}>{part}</span>
                ))}
              </span>
              <span className="visually-hidden">
                {status === 'completed' ? 'Done' : status === 'active' ? 'In progress' : 'Up next'}
              </span>
            </li>
          );
        })}
        </ol>
      </div>
    </section>
  );
}
