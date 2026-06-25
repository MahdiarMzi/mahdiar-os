import { useEffect, useRef, useState, useCallback } from 'react';
import CoreGlyph from './CoreGlyph';

const IDENTITY_MODES = [
  {
    id: 'identity',
    label: 'Identity',
    kicker: 'Mahdiar Mazinani',
    title: 'Computer Studies in Vancouver.',
    body: 'Building a personal operating system around useful software, calm interfaces, and the habit of finishing real things.',
    meta: ['Langara College', 'Vancouver, BC', 'Open to internships'],
  },
  {
    id: 'mission',
    label: 'Mission',
    kicker: 'What guides the system',
    title: 'Make software feel understandable.',
    body: 'I care about products that remove friction: simple enough to trust, structured enough to grow, and polished enough to feel considered.',
    meta: ['Clarity', 'Reliability', 'Taste'],
  },
  {
    id: 'focus',
    label: 'Current Focus',
    kicker: 'Active systems',
    title: 'Mahdiar OS, Spendly, Job Tracker.',
    body: 'A portfolio OS, a native finance app, and a practical job-search workflow. Three projects, one direction: build things people can actually use.',
    meta: ['Mahdiar OS', 'Spendly', 'Job Tracker'],
  },
  {
    id: 'education',
    label: 'Education',
    kicker: 'Learning track',
    title: 'Langara College.',
    body: 'Computer Studies, expected 2027. Dean’s Honour Roll recognition, with the work focused more on capability than credentials.',
    meta: ['Computer Studies', 'Expected 2027', 'Dean’s Honour Roll'],
  },
  {
    id: 'skills',
    label: 'Skills',
    kicker: 'Working language',
    title: 'Interfaces, apps, systems.',
    body: 'React, SwiftUI, JavaScript, Python, Java, SQL, Git, and the judgement to keep an interface from becoming louder than the idea.',
    meta: ['React', 'SwiftUI', 'JavaScript', 'Python'],
  },
  {
    id: 'connect',
    label: 'Connect',
    kicker: 'Signal out',
    title: 'Available for the right work.',
    body: 'Open to software engineering internships, junior roles, and focused freelance projects where care and execution matter.',
    meta: ['GitHub', 'LinkedIn', 'Email'],
    actions: [
      { label: 'GitHub', href: 'https://github.com/MahdiarMzi', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahdiar-mazinani/', external: true },
      { label: 'Email', href: 'mailto:mahdiarmazinani@yahoo.com' },
    ],
  },
];

function ProfileSurface({ onClose }) {
  const [exiting, setExiting] = useState(false);
  const [activeMode, setActiveMode] = useState('identity');
  const panelRef = useRef(null);

  const close = useCallback(() => setExiting(true), []);
  const activeIndex = IDENTITY_MODES.findIndex((mode) => mode.id === activeMode);
  const active = IDENTITY_MODES[activeIndex] || IDENTITY_MODES[0];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') {
        setActiveMode((current) => {
          const index = IDENTITY_MODES.findIndex((mode) => mode.id === current);
          return IDENTITY_MODES[(index + 1) % IDENTITY_MODES.length].id;
        });
      }
      if (e.key === 'ArrowLeft') {
        setActiveMode((current) => {
          const index = IDENTITY_MODES.findIndex((mode) => mode.id === current);
          return IDENTITY_MODES[(index - 1 + IDENTITY_MODES.length) % IDENTITY_MODES.length].id;
        });
      }
    };
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
        className={`profile-surface profile-surface--identity-core${exiting ? ' profile-surface--exiting' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mahdiar Mazinani — Identity Core"
        ref={panelRef}
        tabIndex={-1}
        onAnimationEnd={handleAnimationEnd}
      >
        <button
          className="workspace-detail__close profile-surface__close"
          onClick={close}
          aria-label="Close profile"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="identity-core__ambient" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <section className="identity-core" aria-labelledby="identity-core-title">
          <div className="identity-core__stage">
            <div className="identity-core__glyph-field" aria-hidden="true">
              <span className="identity-core__ring identity-core__ring--outer" />
              <span className="identity-core__ring identity-core__ring--inner" />
              <span className="identity-core__node identity-core__node--one" />
              <span className="identity-core__node identity-core__node--two" />
              <span className="identity-core__node identity-core__node--three" />
              <CoreGlyph size={96} className="identity-core__glyph" />
            </div>

            <div className="identity-core__content" key={active.id}>
              <p className="identity-core__kicker">{active.kicker}</p>
              <h2 id="identity-core-title">{active.title}</h2>
              <p className="identity-core__body">{active.body}</p>

              <div className="identity-core__meta" aria-label={`${active.label} details`}>
                {active.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {active.actions && (
                <div className="identity-core__actions" aria-label="Connection actions">
                  {active.actions.map((action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noreferrer' : undefined}
                    >
                      {action.label}
                      <span aria-hidden="true">{action.external ? '↗' : '→'}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="identity-core__nav" aria-label="Identity sections">
            {IDENTITY_MODES.map((mode, index) => (
              <button
                key={mode.id}
                type="button"
                className={`identity-core__nav-item${mode.id === active.id ? ' identity-core__nav-item--active' : ''}`}
                onClick={() => setActiveMode(mode.id)}
                aria-pressed={mode.id === active.id}
              >
                <span>0{index + 1}</span>
                {mode.label}
              </button>
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
}

export default ProfileSurface;
