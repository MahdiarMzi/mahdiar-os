import spendlyStats from '../assets/projects/spendly/spendly-04-stats.png';
import shamsaHomeDesktop from '../assets/projects/shamsa/shamsa-01-home-desktop.png';

function ProjectVisual({ projectId }) {
  if (projectId === 'spendly') {
    return (
      <div className="project-visual project-visual--spendly" aria-hidden="true">
        <div className="project-visual__spendly-aura" />
        <div className="project-visual__iphone">
          <img src={spendlyStats} alt="" />
        </div>
        <span className="project-visual__spendly-caption">Spendly · iOS</span>
      </div>
    );
  }

  if (projectId === 'shamsa') {
    return (
      <div className="project-visual project-visual--shamsa" aria-hidden="true">
        <div className="project-visual__browser">
          <div className="project-visual__browser-bar"><i /><i /><i /><span /></div>
          <img src={shamsaHomeDesktop} alt="" />
        </div>
        <span className="project-visual__shamsa-caption">Live website · Persian RTL</span>
      </div>
    );
  }

  if (projectId === 'mahshid') {
    return (
      <div className="project-visual project-visual--mahshid" aria-hidden="true">
        <div className="project-visual__editorial-image"><span /></div>
        <div className="project-visual__editorial-copy">
          <i />
          <span />
          <span />
          <span className="project-visual__editorial-rule" />
        </div>
        <b>COLLECTION / 01</b>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--tracker" aria-hidden="true">
      <div className="project-visual__dashboard-bar"><span /><i /><i /></div>
      <div className="project-visual__kanban">
        <div><span /><i /><i /></div>
        <div><span /><i /></div>
        <div><span /><i /><i /></div>
      </div>
    </div>
  );
}

export default ProjectVisual;
