// Splits each line into characters that pop in, in a scattered order, when `on` is true.
// Modeled on the reveal creadevs uses for its section words.
export default function SplitChars({ lines, on, as: Tag = 'span', className = '', label }) {
  let n = 0;
  // Deterministic scatter so the order looks random but is stable between renders.
  const delay = (i) => ((i * 7919) % 13) * 45;

  return (
    <Tag className={`split-chars ${on ? 'on' : ''} ${className}`} aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} className="split-line" aria-hidden="true">
          {line.split('').map((ch, ci) => {
            const i = n++;
            return (
              <span key={ci} className="ch-wrap">
                <span className="ch" style={{ '--d': `${delay(i)}ms` }}>
                  {ch === ' ' ? '\u00a0' : ch}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
