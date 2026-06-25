import { useEffect, useRef, useState, useCallback } from 'react';
import CoreGlyph from './CoreGlyph';

const PROJECTS = [
  { name: 'Mahdiar OS', tag: 'This portfolio', status: 'Active', dot: 'accent' },
  { name: 'Spendly', tag: 'iOS Finance App', status: 'Building', dot: 'live' },
  { name: 'Job Tracker', tag: 'Web Dashboard', status: 'In Progress', dot: 'busy' },
];

const STACK = [
  'Swift', 'SwiftUI', 'React', 'JavaScript',
  'Python', 'Java', 'HTML', 'CSS', 'SQL', 'Git',
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
          <CoreGlyph size={34} className="profile-surface__glyph" />
          <div className="profile-surface__identity">
            <h2 className="profile-surface__name">Mahdiar Mazinani</h2>
            <p className="profile-surface__subtitle">Computer Studies · Vancouver, BC</p>
          </div>
          <span className="profile-surface__availability" aria-label="Status: Open to internships">
            Open to Internships
          </span>
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

          <div className="profile-surface__statement-block">
            <p className="profile-surface__statement">Building real software.</p>
            <p className="profile-surface__statement-sub">
              Focused on clean products and honest code.
            </p>
          </div>

          <div className="profile-surface__block">
            <span className="profile-surface__block-label">Now</span>
            <div className="profile-surface__projects">
              {PROJECTS.map((p) => (
                <div key={p.name} className="profile-surface__project-row">
                  <span
                    className={`profile-surface__build-dot profile-surface__build-dot--${p.dot}`}
                    aria-hidden="true"
                  />
                  <span className="profile-surface__project-name">{p.name}</span>
                  <span className="profile-surface__project-tag">{p.tag}</span>
                  <span className="profile-surface__project-status">{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-surface__block">
            <span className="profile-surface__block-label">Education</span>
            <div className="profile-surface__edu-row">
              <div>
                <p className="profile-surface__edu-school">Langara College</p>
                <p className="profile-surface__edu-detail">Computer Studies Diploma · Expected 2027</p>
              </div>
              <span className="profile-surface__honour">Dean&apos;s Honour Roll · Spring 2025</span>
            </div>
          </div>

          <div className="profile-surface__block">
            <span className="profile-surface__block-label">Stack</span>
            <div className="profile-surface__flat-chips">
              {STACK.map((tag) => (
                <span key={tag} className="profile-surface__chip">{tag}</span>
              ))}
            </div>
          </div>

          <div className="profile-surface__links">
            <a
              href="https://github.com/MahdiarMzi"
              target="_blank"
              rel="noreferrer"
              className="workspace-detail__action workspace-detail__action--primary"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mahdiar-mazinani/"
              target="_blank"
              rel="noreferrer"
              className="workspace-detail__action"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              href="mailto:mahdiarmazinani@yahoo.com"
              className="workspace-detail__action"
            >
              Email <span aria-hidden="true">↗</span>
            </a>
            <span className="workspace-detail__action workspace-detail__action--soon">
              Resume Soon
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileSurface;
