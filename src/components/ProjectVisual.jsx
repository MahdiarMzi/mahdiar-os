function ProjectVisual({ projectId }) {
  if (projectId === 'spendly') {
    return (
      <div className="project-visual project-visual--spendly" aria-hidden="true">
        <div className="project-visual__phone">
          <span className="project-visual__phone-bar" />
          <span className="project-visual__balance" />
          <span className="project-visual__chart"><i /><i /><i /><i /><i /></span>
          <span className="project-visual__phone-row" />
          <span className="project-visual__phone-row project-visual__phone-row--short" />
        </div>
        <div className="project-visual__orbit-mark project-visual__orbit-mark--one" />
        <div className="project-visual__orbit-mark project-visual__orbit-mark--two" />
      </div>
    );
  }

  if (projectId === 'shamsa') {
    return (
      <div className="project-visual project-visual--shamsa" aria-hidden="true">
        <div className="project-visual__browser">
          <div className="project-visual__browser-bar"><i /><i /><i /><span /></div>
          <div className="project-visual__web-hero"><span /><span /></div>
          <div className="project-visual__web-grid"><i /><i /><i /></div>
        </div>
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
