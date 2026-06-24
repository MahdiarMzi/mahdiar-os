import { useEffect, useRef, useState, useCallback } from 'react';
import ProjectVisual from './ProjectVisual';
import spendlyOnboarding from '../assets/projects/spendly/spendly-01-onboarding.png';
import spendlyIncome from '../assets/projects/spendly/spendly-02-income.png';
import spendlyAddExpense from '../assets/projects/spendly/spendly-03-add-expense.png';
import spendlyStats from '../assets/projects/spendly/spendly-04-stats.png';
import spendlyExpenses from '../assets/projects/spendly/spendly-05-expenses.png';
import shamsaHomeDesktop from '../assets/projects/shamsa/shamsa-01-home-desktop.png';
import shamsaConsultationForm from '../assets/projects/shamsa/shamsa-02-consultation-form.png';
import shamsaMobileHome from '../assets/projects/shamsa/shamsa-03-mobile-home.png';

const SPENDLY_SCREENSHOTS = [
  { src: spendlyOnboarding, label: 'Onboarding', alt: 'Spendly onboarding screen' },
  { src: spendlyIncome, label: 'Income Setup', alt: 'Spendly income setup screen' },
  { src: spendlyAddExpense, label: 'Add Expense', alt: 'Spendly add expense workflow' },
  { src: spendlyStats, label: 'Analytics', alt: 'Spendly spending analytics dashboard' },
  { src: spendlyExpenses, label: 'Expenses', alt: 'Spendly expense list screen' },
];

const SHAMSA_SCREENSHOTS = [
  { src: shamsaHomeDesktop, label: 'Desktop Home', alt: 'Shamsa Immigration desktop home page' },
  { src: shamsaConsultationForm, label: 'Consultation', alt: 'Shamsa Immigration consultation intake form' },
  { src: shamsaMobileHome, label: 'Mobile Home', alt: 'Shamsa Immigration mobile home page' },
];

const WORKSPACE_PROJECTS = [
  {
    id: 'spendly',
    title: 'Spendly',
    type: 'AI-Assisted Personal Finance App',
    status: 'Active',
    role: 'Solo Developer',
    platform: 'iOS',
    year: '2026',
    stack: ['SwiftUI', 'Swift', 'MVVM', 'AI-Assisted Development'],
    problem: 'Many people struggle to understand where their money goes every month. Existing budgeting apps are often overloaded with features and difficult to maintain consistently.',
    solution: 'Built a native iOS application that helps users track expenses, manage budgets, monitor spending habits, and visualize financial health through a simple mobile-first experience.',
    keyFeatures: [
      'Expense Tracking',
      'Budget Management',
      'Spending Analytics',
      'Financial Health Score',
      'Category Insights',
      'Recurring Expenses',
      'Spending Prediction',
    ],
    challenges: [
      'Designing a clean financial dashboard',
      'Managing application state in SwiftUI',
      'Structuring reusable components',
      'Building an intuitive expense workflow',
    ],
    learned: [
      'SwiftUI architecture',
      'Mobile UX design',
      'State management',
      'Product thinking',
      'Shipping a complete application from concept to deployment',
    ],
    githubUrl: 'https://github.com/MahdiarMzi/spendly-ios',
    comingSoon: true,
  },
  {
    id: 'shamsa',
    title: 'Shamsa Immigration Website',
    type: 'Client Website',
    status: 'Live',
    role: 'Web Developer',
    year: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    overview: 'A production website for an immigration consulting business focused on trust, clarity, service structure, and responsive access.',
    problem: 'Immigration services are complex and clients need clear information before contacting a consultant. The website needed to organize services, improve credibility, and guide users toward consultation.',
    solution: 'Built a responsive Persian-first website with structured service pages, a consultation booking flow, SEO metadata, mobile navigation, and professional legal-style presentation.',
    keyFeatures: [
      'Responsive design',
      'Persian RTL layout',
      'Consultation intake flow',
      'Service architecture',
      'SEO-friendly pages',
      'Mobile navigation',
      'Live production deployment',
    ],
    outcome: 'Delivered a live business website with clearer service presentation, stronger trust signals, and a more professional online presence.',
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

function SpendlyGallery({ activeIndex, onSelect }) {
  const touchStartRef = useRef(null);
  const lastIndex = SPENDLY_SCREENSHOTS.length - 1;

  const showPrevious = () => onSelect(activeIndex === 0 ? lastIndex : activeIndex - 1);
  const showNext = () => onSelect(activeIndex === lastIndex ? 0 : activeIndex + 1);

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartRef.current;
    const distance = endX - touchStartRef.current;
    touchStartRef.current = null;
    if (Math.abs(distance) < 44) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <section className="spendly-gallery" aria-label="Spendly app screenshots">
      <div
        className="spendly-gallery__stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SPENDLY_SCREENSHOTS.map((screenshot, index) => (
          <img
            key={screenshot.src}
            src={screenshot.src}
            alt={screenshot.alt}
            className={`spendly-gallery__image${index === activeIndex ? ' spendly-gallery__image--active' : ''}`}
            aria-hidden={index === activeIndex ? undefined : 'true'}
          />
        ))}

        <button
          type="button"
          className="spendly-gallery__arrow spendly-gallery__arrow--previous"
          onClick={showPrevious}
          aria-label="Previous Spendly screenshot"
        >
          ‹
        </button>
        <button
          type="button"
          className="spendly-gallery__arrow spendly-gallery__arrow--next"
          onClick={showNext}
          aria-label="Next Spendly screenshot"
        >
          ›
        </button>

        <div className="spendly-gallery__caption" aria-live="polite">
          <span>{SPENDLY_SCREENSHOTS[activeIndex].label}</span>
          <span>{String(activeIndex + 1).padStart(2, '0')} / 05</span>
        </div>
      </div>

      <div className="spendly-gallery__thumbnails" aria-label="Choose Spendly screenshot">
        {SPENDLY_SCREENSHOTS.map((screenshot, index) => (
          <button
            type="button"
            key={screenshot.src}
            className={`spendly-gallery__thumbnail${index === activeIndex ? ' spendly-gallery__thumbnail--active' : ''}`}
            onClick={() => onSelect(index)}
            aria-label={`Show ${screenshot.label} screenshot`}
            aria-pressed={index === activeIndex}
          >
            <img src={screenshot.src} alt="" />
            <span>{screenshot.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SpendlyCaseStudy({ project, activeImage, onSelectImage }) {
  return (
    <div className="workspace-detail__body workspace-detail__body--spendly">
      <SpendlyGallery activeIndex={activeImage} onSelect={onSelectImage} />

      <dl className="spendly-case-study__facts">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Platform</dt><dd>{project.platform}</dd></div>
        <div><dt>Year</dt><dd>{project.year}</dd></div>
      </dl>

      <section className="spendly-case-study__stack" aria-labelledby="spendly-stack-title">
        <h3 id="spendly-stack-title">Tech Stack</h3>
        <div>
          {project.stack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </section>

      <div className="spendly-case-study__narrative">
        <section>
          <span>01</span>
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </section>
        <section>
          <span>02</span>
          <h3>Solution</h3>
          <p>{project.solution}</p>
        </section>
      </div>

      <section className="spendly-case-study__feature-section">
        <div className="spendly-case-study__section-heading">
          <span>03</span>
          <h3>Key Features</h3>
        </div>
        <ul className="spendly-case-study__feature-grid">
          {project.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </section>

      <div className="spendly-case-study__lists">
        <section>
          <div className="spendly-case-study__section-heading">
            <span>04</span>
            <h3>Technical Challenges</h3>
          </div>
          <ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul>
        </section>
        <section>
          <div className="spendly-case-study__section-heading">
            <span>05</span>
            <h3>What I Learned</h3>
          </div>
          <ul>{project.learned.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
        </section>
      </div>

      <div className="workspace-detail__actions spendly-case-study__actions">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="workspace-detail__action workspace-detail__action--primary"
        >
          GitHub Repository <span aria-hidden="true">↗</span>
        </a>
        <span className="workspace-detail__action workspace-detail__action--soon">Coming Soon</span>
      </div>
    </div>
  );
}

function ShamsaGallery({ activeIndex, onSelect }) {
  const touchStartRef = useRef(null);
  const lastIndex = SHAMSA_SCREENSHOTS.length - 1;

  const showPrevious = () => onSelect(activeIndex === 0 ? lastIndex : activeIndex - 1);
  const showNext = () => onSelect(activeIndex === lastIndex ? 0 : activeIndex + 1);

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartRef.current;
    const distance = endX - touchStartRef.current;
    touchStartRef.current = null;
    if (Math.abs(distance) < 44) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <section className="shamsa-gallery" aria-label="Shamsa Immigration website screenshots">
      <div
        className="shamsa-gallery__stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SHAMSA_SCREENSHOTS.map((screenshot, index) => (
          <img
            key={screenshot.src}
            src={screenshot.src}
            alt={screenshot.alt}
            className={`shamsa-gallery__image${index === activeIndex ? ' shamsa-gallery__image--active' : ''}`}
            aria-hidden={index === activeIndex ? undefined : 'true'}
          />
        ))}

        <button
          type="button"
          className="shamsa-gallery__arrow shamsa-gallery__arrow--previous"
          onClick={showPrevious}
          aria-label="Previous Shamsa screenshot"
        >
          ‹
        </button>
        <button
          type="button"
          className="shamsa-gallery__arrow shamsa-gallery__arrow--next"
          onClick={showNext}
          aria-label="Next Shamsa screenshot"
        >
          ›
        </button>

        <div className="shamsa-gallery__caption" aria-live="polite">
          <span>{SHAMSA_SCREENSHOTS[activeIndex].label}</span>
          <span>{String(activeIndex + 1).padStart(2, '0')} / 03</span>
        </div>
      </div>

      <div className="shamsa-gallery__thumbnails" aria-label="Choose Shamsa screenshot">
        {SHAMSA_SCREENSHOTS.map((screenshot, index) => (
          <button
            type="button"
            key={screenshot.src}
            className={`shamsa-gallery__thumbnail${index === activeIndex ? ' shamsa-gallery__thumbnail--active' : ''}`}
            onClick={() => onSelect(index)}
            aria-label={`Show ${screenshot.label} screenshot`}
            aria-pressed={index === activeIndex}
          >
            <img src={screenshot.src} alt="" />
            <span>{screenshot.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ShamsaCaseStudy({ project, activeImage, onSelectImage }) {
  return (
    <div className="workspace-detail__body workspace-detail__body--shamsa">
      <ShamsaGallery activeIndex={activeImage} onSelect={onSelectImage} />

      <dl className="shamsa-case-study__facts">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Type</dt><dd>{project.type}</dd></div>
        <div><dt>Year</dt><dd>{project.year}</dd></div>
      </dl>

      <section className="shamsa-case-study__stack" aria-labelledby="shamsa-stack-title">
        <h3 id="shamsa-stack-title">Tech Stack</h3>
        <div>
          {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </section>

      <section className="shamsa-case-study__overview">
        <span>01</span>
        <div><h3>Overview</h3><p>{project.overview}</p></div>
      </section>

      <div className="shamsa-case-study__narrative">
        <section><span>02</span><h3>Problem</h3><p>{project.problem}</p></section>
        <section><span>03</span><h3>Solution</h3><p>{project.solution}</p></section>
      </div>

      <section className="shamsa-case-study__features">
        <div className="shamsa-case-study__section-heading"><span>04</span><h3>Key Features</h3></div>
        <ul>{project.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </section>

      <section className="shamsa-case-study__outcome">
        <span>05</span>
        <div><h3>Outcome</h3><p>{project.outcome}</p></div>
      </section>

      <div className="workspace-detail__actions shamsa-case-study__actions">
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="workspace-detail__action workspace-detail__action--primary">
          Live Site <span aria-hidden="true">↗</span>
        </a>
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="workspace-detail__action">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

function WorkspaceDetail({ projectId, onClose }) {
  const [exiting, setExiting] = useState(false);
  const [activeSpendlyImage, setActiveSpendlyImage] = useState(0);
  const [activeShamsaImage, setActiveShamsaImage] = useState(0);
  const panelRef = useRef(null);
  const project = PROJECT_BY_ID[projectId];

  const close = useCallback(() => setExiting(true), []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') close();
      if (projectId !== 'spendly' && projectId !== 'shamsa') return;
      const screenshots = projectId === 'spendly' ? SPENDLY_SCREENSHOTS : SHAMSA_SCREENSHOTS;
      const setActiveImage = projectId === 'spendly' ? setActiveSpendlyImage : setActiveShamsaImage;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveImage((current) => (
          current === 0 ? screenshots.length - 1 : current - 1
        ));
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveImage((current) => (
          current === screenshots.length - 1 ? 0 : current + 1
        ));
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [close, projectId]);

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
        className={`workspace-detail${projectId === 'spendly' ? ' workspace-detail--spendly' : ''}${projectId === 'shamsa' ? ' workspace-detail--shamsa' : ''}${exiting ? ' workspace-detail--exiting' : ''}`}
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

        {projectId === 'spendly' ? (
          <SpendlyCaseStudy
            project={project}
            activeImage={activeSpendlyImage}
            onSelectImage={setActiveSpendlyImage}
          />
        ) : projectId === 'shamsa' ? (
          <ShamsaCaseStudy
            project={project}
            activeImage={activeShamsaImage}
            onSelectImage={setActiveShamsaImage}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default WorkspaceDetail;
