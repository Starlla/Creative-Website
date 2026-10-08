export function Logo() {
  return (
    <span className="logo" aria-label="Loophaus">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="16" cy="16" r="5" fill="var(--signal)" />
      </svg>
      <span className="logo-word">LOOPHAUS</span>
    </span>
  );
}

export default function Nav() {
  return (
    <header className="nav">
      <a href="#hero" className="nav-home">
        <Logo />
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="#about">About</a>
        <a href="#timeline">Timeline</a>
        <a href="#join" className="nav-join">
          Join
        </a>
      </nav>
    </header>
  );
}
