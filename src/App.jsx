import { useState, useCallback } from 'react';
import BootScreen from './components/BootScreen';
import SystemBar from './components/SystemBar';
import HomeCanvas from './components/HomeCanvas';
import Dock from './components/Dock';
import SurfacePlaceholder from './components/SurfacePlaceholder';
import './styles/global.css';

function App() {
  const [booting, setBooting] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const handleBootComplete = useCallback(() => setBooting(false), []);

  const handleNavigate = useCallback((view) => {
    setActiveView(view);
    if (view !== 'home' && view !== 'work') {
      setSelectedWorkspace(null);
    }
  }, []);

  const showCanvas = activeView === 'home' || activeView === 'work';

  return (
    <>
      {booting && <BootScreen onComplete={handleBootComplete} />}

      {!booting && (
        <div className="os-shell">
          <SystemBar />

          {showCanvas && (
            <HomeCanvas
              selectedWorkspace={selectedWorkspace}
              onSelectWorkspace={setSelectedWorkspace}
              activeView={activeView}
            />
          )}

          {!showCanvas && <SurfacePlaceholder view={activeView} />}

          <Dock activeView={activeView} onNavigate={handleNavigate} />
        </div>
      )}
    </>
  );
}

export default App;
