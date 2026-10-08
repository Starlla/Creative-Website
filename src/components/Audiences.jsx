import { useEffect, useRef, useState } from 'react';
import { audiences } from '../data.js';
import SplitChars from './SplitChars.jsx';
import useInView from './useInView.js';

// One audience: its own heading (shown on narrow screens) plus copy and features.
function AudienceArticle({ a, articleRef }) {
  const [headRef, headIn] = useInView(0.4);
  return (
    <article ref={articleRef} className="aud-article" id={`for-${a.id}`} aria-labelledby={`h-${a.id}`}>
      <div ref={headRef} className="aud-head-mobile">
        <SplitChars as="h2" lines={a.label.split(' ')} on={headIn} label={a.label} />
      </div>
      <h3 id={`h-${a.id}`} className="aud-title">
        {a.title} <em>{a.accent}</em>
      </h3>
      <p className="aud-body">{a.body}</p>
      <div className="feat-head mono">Key features · {a.label}</div>
      <ul className="feat-grid">
        {a.features.map(([name, desc]) => (
          <li key={name} className="feat">
            <h4>{name}</h4>
            <p>{desc}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Audiences() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  // The article crossing the middle band of the viewport decides the sticky heading.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    refs.current.forEach((el, i) => {
      if (el) {
        el.dataset.idx = i;
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);

  return (
    <section className="audiences" aria-label="Who Loophaus is built for">
      <div className="aud-grid">
        <div className="aud-sticky" aria-hidden="true">
          <div className="aud-stack">
            {audiences.map((a, i) => (
              <SplitChars key={a.id} lines={a.split} on={i === active} className="aud-big" />
            ))}
          </div>
          <ol className="aud-index mono">
            {audiences.map((a, i) => (
              <li key={a.id} className={i === active ? 'is-active' : ''}>
                {a.label}
              </li>
            ))}
          </ol>
        </div>

        <div className="aud-articles">
          {audiences.map((a, i) => (
            <AudienceArticle key={a.id} a={a} articleRef={(el) => (refs.current[i] = el)} />
          ))}
        </div>
      </div>
    </section>
  );
}
