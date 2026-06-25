import { useState, useCallback } from 'react';
import BootScreen from './components/BootScreen';
import SystemBar from './components/SystemBar';
import HomeCanvas from './components/HomeCanvas';
import Dock from './components/Dock';
import SurfacePlaceholder from './components/SurfacePlaceholder';
import WorkspaceDetail from './components/WorkspaceDetail';
import ProfileSurface from './components/ProfileSurface';
import './styles/global.css';

function App() {
  const [booting, setBooting] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const handleBootComplete = useCallback(() => setBooting(false), []);
  const handleCloseSurface = useCallback(() => setActiveView('home'), []);
  const handleOpenWork = useCallback(() => setActiveView('work'), []);

  const handleNavigate = useCallback((view) => {
    setActiveView(view);
    if (view !== 'work') {
      setSelectedWorkspace(null);
    }
  }, []);

  const handleCloseWorkspace = useCallback(() => setSelectedWorkspace(null), []);

  const showCanvas = activeView === 'home' || activeView === 'work' || activeView === 'profile';

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
              onOpenWork={handleOpenWork}
              activeView={activeView}
            />
          )}

          {!showCanvas && (
            <SurfacePlaceholder
              view={activeView}
              onClose={handleCloseSurface}
            />
          )}

          {activeView === 'profile' && (
            <ProfileSurface onClose={handleCloseSurface} />
          )}

          {showCanvas && selectedWorkspace && (
            <WorkspaceDetail projectId={selectedWorkspace} onClose={handleCloseWorkspace} />
          )}

          <Dock activeView={activeView} onNavigate={handleNavigate} />
        </div>
      )}
    </>
  );
}

export default App;
