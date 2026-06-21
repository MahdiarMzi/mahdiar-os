import { useState, useEffect } from 'react';
import CoreGlyph from './CoreGlyph';

function BootScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1100);
    const doneTimer = setTimeout(() => onComplete(), 1520);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`boot-screen${exiting ? ' boot-screen--exiting' : ''}`}
      role="status"
      aria-label="System starting"
    >
      <div className="boot-center">
        <CoreGlyph size={52} className="boot-glyph" />
        <span className="boot-label">Mahdiar OS</span>
      </div>
    </div>
  );
}

export default BootScreen;
