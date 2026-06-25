import { useCallback, useEffect, useRef, useState } from 'react';
import CoreGlyph from './CoreGlyph';

const CONTENT = {
  profile: 'Profile surface will live here.',
};

const EMAIL = 'mahdiarmazinani@yahoo.com';
const GITHUB_URL = 'https://github.com/MahdiarMzi';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mahdiar-mazinani/';
const RESUME_URL = null;

const CONNECT_ENDPOINTS = [
  {
    id: 'email',
    label: 'Email',
    meta: EMAIL,
    type: 'copy',
    x: 248,
    y: 145,
    anchorX: 364,
    anchorY: 177,
  },
  {
    id: 'github',
    label: 'GitHub',
    meta: 'MahdiarMzi',
    type: 'link',
    href: GITHUB_URL,
    ariaLabel: 'Open MahdiarMzi on GitHub in a new tab',
    x: 552,
    y: 152,
    anchorX: 552,
    anchorY: 184,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    meta: 'Mahdiar Mazinani',
    type: 'link',
    href: LINKEDIN_URL,
    ariaLabel: 'Open Mahdiar Mazinani on LinkedIn in a new tab',
    x: 252,
    y: 364,
    anchorX: 368,
    anchorY: 396,
  },
  {
    id: 'resume',
    label: 'Resume',
    meta: RESUME_URL ? 'PDF' : 'PDF offline',
    type: 'download',
    href: RESUME_URL,
    disabled: !RESUME_URL,
    x: 548,
    y: 356,
    anchorX: 548,
    anchorY: 388,
  },
];

function ConnectSurface({ onClose }) {
  const [activeNode, setActiveNode] = useState(null);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const copyTimerRef = useRef(null);
  const noticeTimerRef = useRef(null);
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
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    };
  }, [onClose]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setNoticeVisible(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setActiveNode(null), 2000);
      noticeTimerRef.current = window.setTimeout(() => setNoticeVisible(false), 2000);
    } catch {
      setNoticeVisible(false);
    }
  }, []);

  const handleNodeEnter = useCallback((id) => setActiveNode(id), []);
  const handleNodeLeave = useCallback(() => setActiveNode(null), []);

  const renderEndpoint = (endpoint) => {
    const className = `connect-node connect-node--${endpoint.id}`;
    const commonProps = {
      className,
      onMouseEnter: () => handleNodeEnter(endpoint.id),
      onMouseLeave: handleNodeLeave,
      onFocus: () => handleNodeEnter(endpoint.id),
      onBlur: handleNodeLeave,
      style: {
        '--node-x': `${endpoint.x}px`,
        '--node-y': `${endpoint.y}px`,
      },
    };

    const content = (
      <>
        <span className="connect-node__marker" aria-hidden="true" />
        <span className="connect-node__text">
          <span className="connect-node__label">{endpoint.label}</span>
          <span className="connect-node__meta">{endpoint.meta}</span>
        </span>
      </>
    );

    if (endpoint.type === 'copy') {
      return (
        <button
          type="button"
          key={endpoint.id}
          {...commonProps}
          onClick={handleCopyEmail}
          aria-label={`Copy email address ${EMAIL}`}
        >
          {content}
        </button>
      );
    }

    if (endpoint.disabled) {
      return (
        <button
          type="button"
          key={endpoint.id}
          {...commonProps}
          disabled
          aria-label="Resume PDF is not available yet"
        >
          {content}
        </button>
      );
    }

    return (
      <a
        key={endpoint.id}
        {...commonProps}
        href={endpoint.href}
        target="_blank"
        rel="noreferrer"
        aria-label={endpoint.ariaLabel}
        download={endpoint.type === 'download' ? true : undefined}
      >
        {content}
      </a>
    );
  };

  return (
    <section
      className="connect-surface"
      aria-label="Connect — communication endpoint graph"
      ref={surfaceRef}
      tabIndex={-1}
      data-active-node={activeNode || 'none'}
    >
      <div className="connect-surface__field" aria-hidden="true" />

      <div className="connect-graph" role="group" aria-label="Communication endpoints">
        <svg className="connect-graph__lines" viewBox="0 0 800 520" aria-hidden="true">
          {CONNECT_ENDPOINTS.map((endpoint) => (
            <line
              key={endpoint.id}
              className={`connect-graph__line connect-graph__line--${endpoint.id}`}
              x1="400"
              y1="260"
              x2={endpoint.anchorX}
              y2={endpoint.anchorY}
            />
          ))}
        </svg>

        <div className="connect-graph__core" aria-hidden="true">
          <CoreGlyph size={76} className="connect-graph__glyph" />
          <span>Connect</span>
        </div>

        {CONNECT_ENDPOINTS.map(renderEndpoint)}
      </div>

      <div
        className={`connect-notice${noticeVisible ? ' connect-notice--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        Connection established.
      </div>

      <div className="connect-surface__close-wrap">
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
      </div>
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
