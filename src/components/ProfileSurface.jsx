import { useEffect, useRef, useState, useCallback } from 'react';
import CoreGlyph from './CoreGlyph';

const PROGRAMMING = ['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'];
const TOOLS = ['Git', 'GitHub', 'VS Code', 'Claude Code', 'Codex'];

const BUILDING = [
  { name: 'Mahdiar OS', desc: 'This portfolio', dot: 'accent' },
  { name: 'Job Tracker', desc: 'In progress', dot: 'busy' },
  { name: 'Spendly', desc: 'Improving', dot: 'live' },
  { name: 'React Ecosystem', desc: 'Learning', dot: 'accent' },
  { name: 'Software Engineering Internship', desc: 'Preparing', dot: 'dim' },
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

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

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
          <CoreGlyph size={36} className="profile-surface__glyph" />
          <div className="profile-surface__identity">
            <h2 className="profile-surface__name">Mahdiar Mazinani</h2>
            <p className="profile-surface__subtitle">Computer Studies Student · Vancouver, BC</p>
            <span className="profile-surface__availability" aria-label="Status: Available for Internship">
              Available for Internship
            </span>
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

          <section className="profile-surface__section" aria-labelledby="ps-about">
            <h3 id="ps-about" className="profile-surface__section-label">About</h3>
            <p className="profile-surface__text">
              I build real software products. I&apos;m a Computer Studies student at Langara College
              in Vancouver, growing through projects that ship and problems worth solving.
            </p>
            <p className="profile-surface__text">
              Most of what I know I&apos;ve learned by doing — a native iOS finance app, production
              websites for real clients, and this portfolio, which is itself a project. I care about
              clean interfaces, thoughtful experiences, and code that&apos;s honest about what it does.
            </p>
            <p className="profile-surface__text">
              I&apos;m looking for a software engineering internship where I can contribute from day one,
              learn from the people around me, and be part of building something worth shipping.
            </p>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-building">
            <h3 id="ps-building" className="profile-surface__section-label">Currently Building</h3>
            <ul className="profile-surface__building-list">
              {BUILDING.map((item) => (
                <li key={item.name}>
                  <span className={`profile-surface__build-dot profile-surface__build-dot--${item.dot}`} aria-hidden="true" />
                  <span className="profile-surface__build-name">{item.name}</span>
                  <span className="profile-surface__build-desc">{item.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-education">
            <h3 id="ps-education" className="profile-surface__section-label">Education</h3>
            <div className="profile-surface__edu">
              <div className="profile-surface__edu-main">
                <p className="profile-surface__edu-school">Langara College</p>
                <p className="profile-surface__edu-program">Computer Studies Diploma</p>
              </div>
              <div className="profile-surface__edu-meta">
                <span>Expected 2027</span>
                <span className="profile-surface__honour">Dean&apos;s Honour Roll · Spring 2025</span>
              </div>
            </div>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-stack">
            <h3 id="ps-stack" className="profile-surface__section-label">Tech Stack</h3>
            <div className="profile-surface__stack-grid">
              <div>
                <p className="profile-surface__stack-category">Programming</p>
                <div className="profile-surface__chips">
                  {PROGRAMMING.map((tag) => (
                    <span key={tag} className="workspace-detail__tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="profile-surface__stack-category">Tools</p>
                <div className="profile-surface__chips">
                  {TOOLS.map((tag) => (
                    <span key={tag} className="workspace-detail__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-certs">
            <h3 id="ps-certs" className="profile-surface__section-label">Certifications</h3>
            <p className="profile-surface__cert">CompTIA Network+</p>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-experience">
            <h3 id="ps-experience" className="profile-surface__section-label">Experience</h3>
            <p className="profile-surface__exp-role">IT Help Desk</p>
            <p className="profile-surface__text">
              Provided first-line technical support for hardware, software, and connectivity issues.
              Handled user requests, diagnosed problems, documented resolutions, and maintained
              system reliability across a professional environment.
            </p>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-goal">
            <h3 id="ps-goal" className="profile-surface__section-label">Goal</h3>
            <p className="profile-surface__goal-title">Junior Software Engineer</p>
            <p className="profile-surface__text">
              Looking for a software engineering internship or entry-level role where I can contribute
              to real products, grow quickly, and work alongside engineers who care about what they build.
            </p>
          </section>

          <section className="profile-surface__section" aria-labelledby="ps-languages">
            <h3 id="ps-languages" className="profile-surface__section-label">Languages</h3>
            <div className="profile-surface__languages">
              <div className="profile-surface__language">
                <p className="profile-surface__language-name">English</p>
                <p className="profile-surface__language-level">Professional Working Proficiency</p>
              </div>
              <div className="profile-surface__language">
                <p className="profile-surface__language-name">Persian</p>
                <p className="profile-surface__language-level">Native</p>
              </div>
            </div>
          </section>

          <div className="profile-surface__contact" role="group" aria-label="Contact links">
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
              Resume Coming Soon
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileSurface;
