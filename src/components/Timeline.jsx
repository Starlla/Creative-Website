import { timeline } from '../data.js';

const statusText = { done: 'Done', active: 'In progress', next: 'Up next' };

export default function Timeline() {
  return (
    <section id="timeline" className="timeline">
      <div className="timeline-head">
        <h2 className="section-title">Timeline</h2>
        <p>
          Here's where the build stands. <a href="#join">Join the list</a> to get into closed beta.
        </p>
      </div>
      <ol className="tl">
        {timeline.map((step, i) => (
          <li key={step.label} className={`tl-step is-${step.status}`}>
            <span className="tl-bar mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="tl-label">{step.label}</span>
            <span className="tl-status mono">{statusText[step.status]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
