import { useCallback, useEffect, useRef, useState } from 'react';

const CONTENT = {
  profile: 'Profile surface will live here.',
};

const EMAIL = 'mahdiarmazinani@yahoo.com';
const GITHUB_URL = 'https://github.com/MahdiarMzi';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mahdiar-mazinani/';
const RESUME_URL = null;

const CONTACT_CARDS = [
  {
    id: 'email',
    eyebrow: 'Email',
    value: EMAIL,
    action: 'copy',
  },
  {
    id: 'github',
    eyebrow: 'GitHub',
    value: 'MahdiarMzi',
    actionLabel: 'Open →',
    href: GITHUB_URL,
    ariaLabel: 'Open MahdiarMzi on GitHub in a new tab',
  },
  {
    id: 'linkedin',
    eyebrow: 'LinkedIn',
    value: 'Mahdiar Mazinani',
    actionLabel: 'Open →',
    href: LINKEDIN_URL,
    ariaLabel: 'Open Mahdiar Mazinani on LinkedIn in a new tab',
  },
  {
    id: 'resume',
    eyebrow: 'Resume',
    value: 'PDF',
    actionLabel: 'Download ↓',
    href: RESUME_URL,
    disabled: !RESUME_URL,
  },
];

const AVAILABILITY = [
  'Software Engineering Internships',
  'Junior Software Engineer Roles',
  'Freelance Projects',
];

function ConnectSurface({ onClose }) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);
  const surfaceRef = useRef(null);

  useEffect(() => {
    surfaceRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, [onClose]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <section
      className="connect-surface"
      aria-labelledby="connect-title"
      ref={surfaceRef}
      tabIndex={-1}
    >
      <header className="connect-surface__header">
        <span className="connect-surface__index">04</span>
        <div>
          <h1 id="connect-title">Connect</h1>
          <p>Let&apos;s build something worth using.</p>
        </div>
        <button
          type="button"
          className="connect-surface__close"
          onClick={onClose}
          aria-label="Close Connect surface"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="connect-surface__cards" aria-label="Contact options">
        {CONTACT_CARDS.map((card) => (
          <article className="connect-card" key={card.id}>
            <div>
              <span className="connect-card__eyebrow">{card.eyebrow}</span>
              <p className="connect-card__value">{card.value}</p>
            </div>

            {card.action === 'copy' ? (
              <button
                type="button"
                className={`connect-card__action${copied ? ' connect-card__action--copied' : ''}`}
                onClick={handleCopyEmail}
                aria-label={`Copy ${EMAIL}`}
              >
                <span className="connect-card__action-label">
                  {copied ? 'Copied ✓' : 'Copy'}
                </span>
              </button>
            ) : card.disabled ? (
              <button
                type="button"
                className="connect-card__action connect-card__action--disabled"
                disabled
                aria-label="Resume PDF is not available yet"
              >
                {card.actionLabel}
              </button>
            ) : (
              <a
                className="connect-card__action"
                href={card.href}
                target="_blank"
                rel="noreferrer"
                aria-label={card.ariaLabel}
                download={card.id === 'resume' ? true : undefined}
              >
                {card.actionLabel}
              </a>
            )}
          </article>
        ))}
      </div>

      <section className="connect-availability" aria-labelledby="connect-availability-title">
        <div className="connect-availability__status">
          <span className="connect-availability__pulse" aria-hidden="true" />
          <h2 id="connect-availability-title">Available for</h2>
        </div>

        <ul>
          {AVAILABILITY.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </section>
  );
}

function SurfacePlaceholder({ view, onClose }) {
  if (view === 'connect') {
    return (
      <div className="surface-placeholder surface-placeholder--connect">
        <ConnectSurface onClose={onClose} />
      </div>
    );
  }

  const message = CONTENT[view];
  if (!message) return null;

  return (
    <div className="surface-placeholder" aria-label={view}>
      <p className="surface-placeholder__message">{message}</p>
    </div>
  );
}

export default SurfacePlaceholder;
