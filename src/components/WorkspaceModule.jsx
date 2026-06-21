// Outer positioning wrapper removed — orbit places modules via .orbit-module-wrap in HomeCanvas
function WorkspaceModule({
  id,
  title,
  platform,
  domain,
  onSelect,
  isSelected,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onFocus,
  onBlur,
}) {
  return (
    <button
      className={`workspace-module${isSelected ? ' workspace-module--selected' : ''}`}
      onClick={() => onSelect(id)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-pressed={isSelected}
      aria-label={`${title} — ${platform}, ${domain}`}
    >
      <span className="workspace-module__title">{title}</span>
      <span className="workspace-module__meta">{platform} · {domain}</span>
    </button>
  );
}

export default WorkspaceModule;
