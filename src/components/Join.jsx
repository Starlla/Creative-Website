import { useState } from 'react';
import { roles } from '../data.js';

export default function Join() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [beta, setBeta] = useState(true);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter an email address like you@studio.com.');
      return;
    }
    setError('');
    setDone(true);
  };

  return (
    <section id="join" className="join">
      <h2 className="join-title">Unlock early access</h2>

      <div className="join-row">
        <p className="join-sub">
          Be first in when the doors open.{' '}
          <span>
            Early members get closed-beta access, a founding-member badge on their profile, and
            first pick of handles.
          </span>
        </p>

        <div className="join-card">
          <h3 className="join-card-title">Join Loophaus</h3>

          {done ? (
            <div className="join-pill" role="status">
              <p className="join-pill-head">You're on the list.</p>
              <p>
                We'll email {email} when closed beta opens
                {beta ? ', and your beta application is in.' : '.'}
              </p>
            </div>
          ) : (
            <form className="join-form" onSubmit={submit} noValidate>
              <div className="join-field">
                <label htmlFor="join-email" className="visually-hidden">Email</label>
                <input
                  id="join-email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? 'invalid' : ''}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'join-error' : undefined}
                />
                {error && <span id="join-error" className="join-error">{error}</span>}
              </div>

              <div className="join-field">
                <label htmlFor="join-role" className="visually-hidden">I'm a</label>
                <select id="join-role" value={role} onChange={(e) => setRole(e.target.value)}>
                  {roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>

              <label className="join-toggle-row" htmlFor="join-beta">
                <span>
                  <span className="join-toggle-label">Apply for closed beta access</span>
                  <span className="join-note">*Spots are limited. Apply now to get in early.</span>
                </span>
                <input
                  id="join-beta"
                  type="checkbox"
                  className="join-toggle"
                  checked={beta}
                  onChange={(e) => setBeta(e.target.checked)}
                />
              </label>

              <div className="join-submit-row">
                <button type="submit" className="join-submit">
                  Submit
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
