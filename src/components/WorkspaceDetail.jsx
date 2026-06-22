import { useEffect, useRef, useState, useCallback } from 'react';
import ProjectVisual from './ProjectVisual';
import spendlyOnboarding from '../assets/projects/spendly/spendly-01-onboarding.png';
import spendlyIncome from '../assets/projects/spendly/spendly-02-income.png';
import spendlyAddExpense from '../assets/projects/spendly/spendly-03-add-expense.png';
import spendlyStats from '../assets/projects/spendly/spendly-04-stats.png';
import spendlyExpenses from '../assets/projects/spendly/spendly-05-expenses.png';

const SPENDLY_SCREENSHOTS = [
  { src: spendlyOnboarding, label: 'Onboarding', alt: 'Spendly onboarding screen' },
  { src: spendlyIncome, label: 'Income Setup', alt: 'Spendly income setup screen' },
  { src: spendlyAddExpense, label: 'Add Expense', alt: 'Spendly add expense workflow' },
  { src: spendlyStats, label: 'Analytics', alt: 'Spendly spending analytics dashboard' },
  { src: spendlyExpenses, label: 'Expenses', alt: 'Spendly expense list screen' },
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

function WorkspaceDetail({ projectId, onClose }) {
  const [exiting, setExiting] = useState(false);
  const [activeSpendlyImage, setActiveSpendlyImage] = useState(0);
  const panelRef = useRef(null);
  const project = PROJECT_BY_ID[projectId];

  const close = useCallback(() => setExiting(true), []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') close();
      if (projectId !== 'spendly') return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveSpendlyImage((current) => (
          current === 0 ? SPENDLY_SCREENSHOTS.length - 1 : current - 1
        ));
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveSpendlyImage((current) => (
          current === SPENDLY_SCREENSHOTS.length - 1 ? 0 : current + 1
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
        className={`workspace-detail${projectId === 'spendly' ? ' workspace-detail--spendly' : ''}${exiting ? ' workspace-detail--exiting' : ''}`}
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
