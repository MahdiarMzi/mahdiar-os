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
    x: 150,
    y: 178,
    portX: 414,
    portY: 258,
    bendX: 294,
    align: 'left',
  },
  {
    id: 'github',
    label: 'GitHub',
    meta: 'MahdiarMzi',
    type: 'link',
    href: GITHUB_URL,
    ariaLabel: 'Open MahdiarMzi on GitHub in a new tab',
    x: 750,
    y: 178,
    portX: 486,
    portY: 258,
    bendX: 606,
    align: 'right',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    meta: 'Mahdiar Mazinani',
    type: 'link',
    href: LINKEDIN_URL,
    ariaLabel: 'Open Mahdiar Mazinani on LinkedIn in a new tab',
    x: 150,
    y: 382,
    portX: 414,
    portY: 302,
    bendX: 294,
    align: 'left',
  },
  {
    id: 'resume',
    label: 'Resume',
    meta: RESUME_URL ? 'PDF' : 'PDF unavailable',
    type: 'download',
    href: RESUME_URL,
    disabled: !RESUME_URL,
    x: 750,
    y: 382,
    portX: 486,
    portY: 302,
    bendX: 606,
    align: 'right',
  },
];

const getConnectionPath = ({ portX, portY, bendX, x, y }) => (
  `M ${portX} ${portY} H ${bendX} V ${y} H ${x}`
);

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
    const active = activeNode === endpoint.id;
    const quiet = activeNode && !active;
    const className = [
      'connect-node',
      `connect-node--${endpoint.id}`,
      `connect-node--${endpoint.align}`,
      active ? 'connect-node--active' : '',
      quiet ? 'connect-node--quiet' : '',
    ].filter(Boolean).join(' ');
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
          aria-disabled="true"
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
      aria-label="Connect — communication mode"
      ref={surfaceRef}
      tabIndex={-1}
      data-active-node={activeNode || 'none'}
    >
      <div className="connect-surface__mode" aria-hidden="true">
        <span>Communication mode</span>
        <i />
      </div>

      <div className="connect-field" role="group" aria-label="Communication endpoints">
        <svg className="connect-field__routes" viewBox="0 0 900 560" aria-hidden="true">
          <rect className="connect-field__frame" x="70" y="76" width="760" height="408" rx="2" />
          <line className="connect-field__axis connect-field__axis--horizontal" x1="108" y1="280" x2="792" y2="280" />
          <line className="connect-field__axis connect-field__axis--vertical" x1="450" y1="112" x2="450" y2="448" />

          {CONNECT_ENDPOINTS.map((endpoint) => (
            <g
              key={endpoint.id}
              className={[
                'connect-field__route',
                activeNode === endpoint.id ? 'connect-field__route--active' : '',
                activeNode && activeNode !== endpoint.id ? 'connect-field__route--quiet' : '',
              ].filter(Boolean).join(' ')}
            >
              <path d={getConnectionPath(endpoint)} />
              <circle className="connect-field__port" cx={endpoint.portX} cy={endpoint.portY} r="3.2" />
              <circle className="connect-field__terminal" cx={endpoint.x} cy={endpoint.y} r="4.4" />
            </g>
          ))}
        </svg>

        <div className="connect-core" aria-hidden="true">
          <span className="connect-core__plate" />
          <CoreGlyph size={82} className="connect-core__glyph" />
          <span className="connect-core__label">Connect</span>
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
