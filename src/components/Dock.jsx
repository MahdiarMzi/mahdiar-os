const ITEMS = [
  { id: 'home',    label: 'Home'    },
  { id: 'work',    label: 'Work'    },
  { id: 'profile', label: 'Profile' },
  { id: 'connect', label: 'Connect' },
];

function Dock({ activeView, onNavigate }) {
  return (
    <nav className="dock" aria-label="Main navigation">
      <div className="dock__inner">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            className={`dock__item${activeView === item.id ? ' dock__item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activeView === item.id ? 'page' : undefined}
          >
            <span className="dock__label">{item.label}</span>
            {activeView === item.id && (
              <span className="dock__indicator" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Dock;
