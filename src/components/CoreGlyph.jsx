import monogram from '../assets/branding/mm-monogram-512.png';

function CoreGlyph({ size = 48, pulse = false, className = '' }) {
  return (
    <img
      src={monogram}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`core-glyph${pulse ? ' core-glyph--pulse' : ''}${className ? ` ${className}` : ''}`}
    />
  );
}

export default CoreGlyph;
