import { useState, useEffect } from 'react';
import CoreGlyph from './CoreGlyph';

function getFormattedTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function SystemBar() {
  const [time, setTime] = useState(getFormattedTime);

  useEffect(() => {
    const tick = setInterval(() => setTime(getFormattedTime()), 15000);
    return () => clearInterval(tick);
  }, []);

  return (
    <header className="system-bar">
      <div className="system-bar__left">
        <CoreGlyph size={18} className="system-bar__glyph" />
        <span className="system-bar__name">Mahdiar OS</span>
      </div>
      <div className="system-bar__right">
        <div className="system-bar__status">
          <span className="status-dot" aria-hidden="true" />
          <span>Available</span>
        </div>
        <time className="system-bar__clock" aria-label={`Current time ${time}`}>
          {time}
        </time>
      </div>
    </header>
  );
}

export default SystemBar;
