import { useEffect, useRef, useState, useCallback } from 'react';
import ProjectVisual from './ProjectVisual';

const WORKSPACE_PROJECTS = [
  {
    id: 'spendly',
    title: 'Spendly',
    type: 'iOS Finance App',
    status: 'Active',
    role: 'iOS Developer',
    stack: ['Swift', 'SwiftUI', 'MVVM', 'AI Integration', 'iOS Native'],
    overview: 'A personal finance iOS application built with SwiftUI and MVVM architecture. Helps users organize expenses, track recurring payments, monitor income, and gain AI-powered insights into spending patterns.',
    problem: 'Financial activity is scattered across cards, receipts, and memory — making it hard to understand where money actually goes.',
    build: 'Built expense categorization, income tracking, recurring payment management, category breakdowns, and financial health scoring. Integrated AI for receipt scanning, bank statement analysis, anomaly detection, and smart spending recommendations.',
    outcome: 'A native iOS app demonstrating Swift, SwiftUI, MVVM architecture, AI integration, and financial product thinking.',
    githubUrl: 'https://github.com/MahdiarMzi/spendly-ios',
  },
  {
    id: 'shamsa',
    title: 'Shamsa Immigration Website',
    type: 'Client Website',
    status: 'Live',
    role: 'Web Developer',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'JSON-LD', 'SEO', 'Formspree'],
    overview: 'A production website for Shamsa Immigration, a Canadian immigration consulting firm in Vancouver. Built for trust, clarity, lead generation, and accessible service information.',
    problem: 'Immigration services are complex to navigate online. Clients need clear information about pathways and a low-friction way to book a consultation.',
    build: 'Multi-page responsive site with dedicated service pages. Implemented JSON-LD structured data, Open Graph tags, XML sitemap, consultation intake via Formspree, and bilingual EN/FA content.',
    outcome: 'Live production website covering 12+ immigration pathways including Express Entry, PNP, Family Sponsorship, Start-Up Visa, and Judicial Review.',
    liveUrl: 'https://shamsa.ca/',
    githubUrl: 'https://github.com/MahdiarMzi/shamsa-immigration-website',
  },
  {
    id: 'mahshid',
    title: 'Mahshid Bridal Couture',
    type: 'Boutique Website',
    status: 'Live',
    role: 'Web Developer',
    stack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'jQuery'],
    overview: 'A professional boutique website for a Vancouver-based bridal studio. Showcases custom wedding gowns, bridal alterations, and evening wear with a PHP/MySQL review system.',
    problem: 'The brand needed a clean online presence that communicates elegance and lets customers submit authentic reviews.',
    build: 'Built a responsive visual-first site with bridal gallery, contact section, and a PHP backend with MySQL database for customer review submissions. jQuery for UI interactions.',
    outcome: 'A polished live boutique site for a real client demonstrating full-stack capability across front-end design and PHP/MySQL backend.',
    liveUrl: 'https://mahshidcouture.com/',
    githubUrl: 'https://github.com/MahdiarMzi/mahshid-bridal-couture',
  },
  {
    id: 'job-tracker',
    title: 'Job Tracker',
    type: 'Web App',
    status: 'Building',
    role: 'Full-Stack Builder',
    stack: ['React', 'Dashboard UI', 'Data Flow'],
    overview: 'A job application tracking workspace for organizing applications, companies, statuses, interviews, notes, and progress.',
    problem: 'Job searching becomes difficult when applications, follow-ups, and interviews are scattered across notes and spreadsheets.',
    build: 'Designing a dashboard-style web application to centralize job search progress and make the process easier to manage.',
    outcome: 'Currently building this as a practical full-stack portfolio project.',
    comingSoon: true,
  },
];

const PROJECT_BY_ID = Object.fromEntries(
  WORKSPACE_PROJECTS.map((p, i) => [p.id, { ...p, index: i }])
);

function WorkspaceDetail({ projectId, onClose }) {
  const [exiting, setExiting] = useState(false);
  const panelRef = useRef(null);
  const project = PROJECT_BY_ID[projectId];

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

  if (!project) return null;

  const { index } = project;

  return (
    <div
      className={`workspace-detail-backdrop${exiting ? ' workspace-detail-backdrop--exiting' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className={`workspace-detail${exiting ? ' workspace-detail--exiting' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — project workspace`}
        ref={panelRef}
        tabIndex={-1}
        onAnimationEnd={handleAnimationEnd}
      >
        <header className="workspace-detail__header">
          <span className="workspace-detail__index">0{index + 1}</span>
          <div className="workspace-detail__heading">
            <h2>{project.title}</h2>
            <p>{project.type}</p>
          </div>
          <span className={`workspace-detail__status workspace-detail__status--${project.status.toLowerCase()}`}>
            {project.status}
          </span>
          <button
            className="workspace-detail__close"
            onClick={close}
            aria-label="Close workspace detail"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="workspace-detail__body">
          <div className="workspace-detail__visual-wrap">
            <ProjectVisual projectId={projectId} />
          </div>

          <dl className="workspace-detail__meta">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                <span className="workspace-detail__stack">
                  {project.stack.map((tag) => (
                    <span key={tag} className="workspace-detail__tag">{tag}</span>
                  ))}
                </span>
              </dd>
            </div>
          </dl>

          <section className="workspace-detail__section">
            <h3>Overview</h3>
            <p>{project.overview}</p>
          </section>

          <div className="workspace-detail__two-col">
            <section className="workspace-detail__section">
              <h3>Problem</h3>
              <p>{project.problem}</p>
            </section>
            <section className="workspace-detail__section">
              <h3>Build</h3>
              <p>{project.build}</p>
            </section>
          </div>

          <section className="workspace-detail__section">
            <h3>Outcome</h3>
            <p>{project.outcome}</p>
          </section>

          <div className="workspace-detail__actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="workspace-detail__action"
              >
                Live Site <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="workspace-detail__action"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.comingSoon && (
              <span className="workspace-detail__action workspace-detail__action--soon">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceDetail;
