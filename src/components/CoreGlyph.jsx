import { useId } from 'react';

function CoreGlyph({ size = 48, pulse = false, className = '' }) {
  const rawId = useId();
  const clipId = `glyph-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={`core-glyph${pulse ? ' core-glyph--pulse' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="24" cy="24" r="18.5" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="24" cy="24" r="17.6" stroke="currentColor" strokeWidth="0.55" opacity="0.28" />
      <line
        x1="31"
        y1="4"
        x2="31"
        y2="44"
        stroke="currentColor"
        strokeWidth="1.75"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

export default CoreGlyph;
