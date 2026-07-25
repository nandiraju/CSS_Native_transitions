import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  Layers,
  Sparkles,
  Monitor,
  BookOpen,
  Globe,
  Compass,
  Sun,
  Moon,
  Settings,
  Menu
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import SharedElementDemo from './components/SharedElementDemo';
import TopLayerDemo from './components/TopLayerDemo';
import DocsPanel from './components/DocsPanel';
import SettingsPanel from './components/SettingsPanel';
import {
  TRANSITIONS,
  loadTransition,
  saveTransition,
  setClickCoords,
  loadBlindsBand,
  applyBlindsBand,
  type TransitionType
} from './transitions';

export default function App() {
  const [section, setSection] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [pageTransition, setPageTransition] = useState<TransitionType>(loadTransition);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);

  // Restore the persisted blinds slat size into the --blinds-band CSS var
  useEffect(() => {
    applyBlindsBand(loadBlindsBand());
  }, []);

  const changePageTransition = (type: TransitionType) => {
    setPageTransition(type);
    saveTransition(type);
  };

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = !darkMode;
    
    if (!document.startViewTransition) {
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return;
    }

    // Theme reveal covers the whole viewport (root snapshot) → viewport coords
    setClickCoords(e);

    document.documentElement.classList.add('theme-change-transition');

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setDarkMode(isDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-change-transition');
    });
  };

  const navigateWithTransition = (newSection: string, e?: React.MouseEvent<HTMLElement>) => {
    if (newSection === section) return;

    // If View Transitions API is not supported, update state instantly
    if (!document.startViewTransition) {
      setSection(newSection);
      setSidebarOpen(false);
      return;
    }

    // Circle reveal animates the main-content snapshot → main-relative coords
    setClickCoords(e, mainRef.current);

    // Apply the transition selected in Settings to every page change.
    // `content-transition` scopes the effect to .main-content only —
    // the sidebar stays out of the animated snapshot.
    const info = TRANSITIONS[pageTransition];
    document.documentElement.classList.add('content-transition', info.className);

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setSection(newSection);
        setSidebarOpen(false); // collapse the mobile drawer with the page change
      });
    });

    if (transition.types) {
      transition.types.add(pageTransition);
    }

    transition.finished.finally(() => {
      document.documentElement.classList.remove('content-transition', info.className);
    });
  };

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateWithTransition} />;
      case 'shared-element':
        return <SharedElementDemo />;
      case 'top-layer':
        return <TopLayerDemo />;
      case 'docs':
        return <DocsPanel />;
      case 'settings':
        return <SettingsPanel transition={pageTransition} onChangeTransition={changePageTransition} />;
      default:
        return <Dashboard onNavigate={navigateWithTransition} />;
    }
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard Overview', icon: Compass },
    { id: 'shared-element', name: 'Shared Elements', icon: Sparkles },
    { id: 'top-layer', name: 'Top Layer (@starting-style)', icon: Layers },
    { id: 'docs', name: 'Native CSS Docs', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="app-container">
      {/* Mobile Top Bar (hidden on desktop via CSS) */}
      <header className="mobile-topbar">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
          style={{
            background: 'rgba(120, 120, 120, 0.05)',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
          }}
        >
          <Menu style={{ width: '20px', height: '20px' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers className="gradient-text" style={{ width: '22px', height: '22px' }} />
          <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>CSS Transitions</span>
        </div>
      </header>

      {/* Backdrop closes the mobile drawer on outside tap */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers className="gradient-text" style={{ width: '28px', height: '28px' }} />
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>CSS Transitions</h1>
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'rgba(120, 120, 120, 0.05)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
              title="Toggle Light/Dark Theme"
            >
              {darkMode ? <Sun style={{ width: '18px', height: '18px' }} /> : <Moon style={{ width: '18px', height: '18px' }} />}
            </button>
          </div>
          <span style={{ 
            fontSize: '0.75rem', 
            background: 'var(--primary-glow)', 
            color: 'var(--primary-dark)', 
            padding: '2px 8px', 
            borderRadius: '99px',
            alignSelf: 'flex-start',
            border: '1px solid var(--primary-glow)'
          }}>
            Baseline 2024-2026
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = section === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => navigateWithTransition(item.id, e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                className={!isActive ? 'sidebar-btn-hover' : ''}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ 
          borderTop: '1px solid var(--border-light)', 
          paddingTop: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Monitor style={{ width: '14px', height: '14px' }} />
            <span>Web Platform Showcase</span>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)', 
              textDecoration: 'none' 
            }}
          >
            <Globe style={{ width: '16px', height: '16px' }} />
            <span>CSS-Only Transitions</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content" ref={mainRef}>
        <style>{`
          .sidebar-btn-hover:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            color: var(--text-primary) !important;
            transform: translateX(4px);
          }
        `}</style>
        {renderSection()}
      </main>
    </div>
  );
}
