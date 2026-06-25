import { useEffect, useRef, useState, useCallback } from 'react';
import CoreGlyph from './CoreGlyph';

const PROJECTS = [
  { name: 'Mahdiar OS', signal: 'Identity system', state: 'Active', dot: 'accent' },
  { name: 'Spendly', signal: 'iOS finance app', state: 'Shipping', dot: 'live' },
  { name: 'Job Tracker', signal: 'Application workflow', state: 'Building', dot: 'busy' },
];

const EXPERTISE = [
  { group: 'Primary', items: ['React interfaces', 'SwiftUI apps', 'Product UI'] },
  { group: 'Secondary', items: ['JavaScript', 'Python', 'Java', 'SQL'] },
  { group: 'Tools', items: ['Git', 'Vite', 'Xcode', 'Figma'] },
];

const COMMANDS = [
  { label: 'GitHub', href: 'https://github.com/MahdiarMzi', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahdiar-mazinani/', external: true },
  { label: 'Resume', disabled: true },
  { label: 'Email', href: 'mailto:mahdiarmazinani@yahoo.com' },
];

function ProfileSurface({ onClose }) {
  const [exiting, setExiting] = useState(false);
  const panelRef = useRef(null);

  const close = useCallback(() => setExiting(true), []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [close]);

  useEffect(() => { panelRef.current?.focus(); }, []);

  const handleAnimationEnd = useCallback((e) => {
    if (exiting && e.target === panelRef.current) onClose();
  }, [exiting, onClose]);

  return (
    <div
      className={`profile-surface-backdrop${exiting ? ' profile-surface-backdrop--exiting' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className={`profile-surface${exiting ? ' profile-surface--exiting' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mahdiar Mazinani — Profile"
        ref={panelRef}
        tabIndex={-1}
        onAnimationEnd={handleAnimationEnd}
      >
        <header className="profile-surface__header">
          <div className="profile-surface__identity-lockup">
            <CoreGlyph size={38} className="profile-surface__glyph" />
            <span className="profile-surface__mode">Identity Surface</span>
          </div>
          <button
            className="workspace-detail__close"
            onClick={close}
            aria-label="Close profile"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="profile-surface__body">
          <section className="profile-surface__hero" aria-labelledby="profile-title">
            <div>
              <p className="profile-surface__eyebrow">Identity</p>
              <h2 id="profile-title" className="profile-surface__name">Mahdiar Mazinani</h2>
              <div className="profile-surface__origin">
                <span>Computer Studies</span>
                <span>Langara College</span>
                <span>Vancouver, BC</span>
              </div>
            </div>

            <div className="profile-surface__availability" aria-label="Status: Open to Software Engineering Internships">
              <span className="profile-surface__availability-dot" aria-hidden="true" />
              <span>Open to Software Engineering Internships</span>
            </div>
          </section>

          <section className="profile-surface__summary" aria-labelledby="profile-summary">
            <span id="profile-summary" className="profile-surface__section-label">System Summary</span>
            <p>
              I’m a Computer Studies student in Vancouver building practical software with a calm,
              product-minded approach. I care about interfaces that feel clear, systems that stay
              understandable, and projects that become useful beyond the first demo.
            </p>
          </section>

          <div className="profile-surface__grid">
            <section className="profile-surface__panel profile-surface__panel--focus" aria-labelledby="profile-focus">
              <span id="profile-focus" className="profile-surface__section-label">Current Focus</span>
              <div className="profile-surface__systems">
                {PROJECTS.map((p) => (
                  <div key={p.name} className="profile-surface__system-row">
                    <span
                      className={`profile-surface__build-dot profile-surface__build-dot--${p.dot}`}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="profile-surface__system-name">{p.name}</span>
                      <span className="profile-surface__system-signal">{p.signal}</span>
                    </div>
                    <span className="profile-surface__system-state">{p.state}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="profile-surface__panel profile-surface__panel--expertise" aria-labelledby="profile-expertise">
              <span id="profile-expertise" className="profile-surface__section-label">Expertise</span>
              <div className="profile-surface__expertise">
                {EXPERTISE.map((group) => (
                  <div key={group.group} className="profile-surface__expertise-group">
                    <span>{group.group}</span>
                    <p>{group.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="profile-surface__panel profile-surface__panel--education" aria-labelledby="profile-education">
              <span id="profile-education" className="profile-surface__section-label">Education</span>
              <div className="profile-surface__education">
                <div>
                  <span>Program</span>
                  <p>Computer Studies · Langara College</p>
                </div>
                <div>
                  <span>Expected Graduation</span>
                  <p>2027</p>
                </div>
                <div>
                  <span>Recognition</span>
                  <p>Dean&apos;s Honour Roll</p>
                </div>
              </div>
            </section>
          </div>

          <section className="profile-surface__commands" aria-labelledby="profile-actions">
            <span id="profile-actions" className="profile-surface__section-label">Actions</span>
            <div className="profile-surface__command-row">
              {COMMANDS.map((command) => (
                command.disabled ? (
                  <span key={command.label} className="profile-surface__command profile-surface__command--disabled">
                    {command.label}
                    <span aria-hidden="true">Pending</span>
                  </span>
                ) : (
                  <a
                    key={command.label}
                    href={command.href}
                    target={command.external ? '_blank' : undefined}
                    rel={command.external ? 'noreferrer' : undefined}
                    className="profile-surface__command"
                  >
                    {command.label}
                    <span aria-hidden="true">{command.external ? '↗' : '→'}</span>
                  </a>
                )
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfileSurface;
