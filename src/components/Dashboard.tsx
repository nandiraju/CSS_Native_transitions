import {
  Sparkles,
  Layers,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ANOMALIES } from '../anomalies';

interface DashboardProps {
  onNavigate: (section: string, e?: React.MouseEvent<HTMLElement>) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const features = [
    {
      id: 'shared-element',
      title: 'Shared Element Transition',
      desc: 'Seamlessly morph elements (like cards, text, and graphics) from one state to another when navigating between views. Powered by CSS View Transitions.',
      icon: Sparkles,
      color: 'var(--primary)',
      badge: 'Baseline Newly Available'
    },
    {
      id: 'top-layer',
      title: 'Top Layer (@starting-style)',
      desc: 'Animate items like dialogs, popovers, and drawers entering or leaving the DOM or changing display: none natively. No JavaScript timeouts required.',
      icon: Layers,
      color: 'var(--accent)',
      badge: 'Baseline Widely Available'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Hero Welcome */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '40px', borderRadius: '24px', background: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent 60%)' }} className="glass-panel">
        <h2 className="section-title">
          Modern Native <span className="gradient-text">CSS Transitions</span>
        </h2>
        <p className="section-desc" style={{ marginTop: '12px' }}>
          Explore the new cutting-edge capabilities of vanilla CSS. With the **View Transitions API** and **@starting-style**, web developers can build gorgeous, high-fidelity entry, exit, and shared-element transitions without heavy JavaScript animation frameworks.
        </p>
      </div>

      {/* Main Features Grid */}
      <div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 600 }}>Interactive Capabilities</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id} 
                onClick={(e) => onNavigate(feat.id, e)}
                className="glass-card" 
                style={{ 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feat.color
                }}>
                  <Icon style={{ width: '24px', height: '24px' }} />
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '6px' }}>{feat.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{feat.desc}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: feat.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {feat.badge}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>
                    Try Demo &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Images: each thumbnail carries the same view-transition-name
          as its gallery card on the Shared Elements page, so the browser
          morphs the image across the page change */}
      <div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: 600 }}>Featured Anomalies</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Shared images between two pages — click a thumbnail and watch it fly into its card on the Shared Elements page.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {ANOMALIES.map((item) => (
            <div
              key={item.id}
              onClick={(e) => onNavigate('shared-element', e)}
              className="glass-card"
              style={{ padding: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <div
                style={{
                  height: '90px',
                  borderRadius: '10px',
                  background: item.gradient,
                  viewTransitionName: `anomaly-${item.id}`,
                  viewTransitionClass: 'anomaly-media'
                } as any}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Browser Baseline Compatibility Info */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle style={{ color: 'var(--secondary)', width: '22px', height: '22px' }} />
          Web Platform Baseline Matrix
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>@starting-style</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Baseline 2024 (Widely Available)</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Supported on Chrome 117+, Firefox 129+, Safari 17.5+, Edge 117+.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>transition-behavior</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Baseline 2024 (Widely Available)</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Supported on Chrome 117+, Firefox 129+, Safari 17.4+, Edge 117+.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>View Transitions (SPA)</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Baseline 2025 (Newly Available)</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Supported on Chrome 111+, Firefox 144+, Safari 18+, Edge 111+.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '16px', background: 'rgba(20, 184, 166, 0.05)', border: '1px solid rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
          <AlertCircle style={{ color: 'var(--secondary)', flexShrink: 0, width: '20px', height: '20px', marginTop: '2px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            <strong>Note on Cross-Document Navigation:</strong> MPAs can trigger view transitions between different HTML page loads using the CSS <code>@view-transition {"{ navigation: auto; }"}</code> rule, supported natively in Chrome 126+ and Safari 18.2+. For Single Page Applications, trigger document state updates wrapped in <code>document.startViewTransition()</code> to achieve the same result.
          </p>
        </div>
      </div>
    </div>
  );
}
