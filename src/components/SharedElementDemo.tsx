import { useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, MapPin, Compass } from 'lucide-react';
import { ANOMALIES, type GalleryItem } from '../anomalies';

export default function SharedElementDemo() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleSelect = (item: GalleryItem) => {
    setClickedId(item.id);
    
    if (!document.startViewTransition) {
      setActiveItem(item);
      return;
    }

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setActiveItem(item);
      });
    });
  };

  const handleBack = () => {
    if (!document.startViewTransition) {
      setActiveItem(null);
      setClickedId(null);
      return;
    }

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setActiveItem(null);
      });
      // Keep clickedId active briefly for the transition back, then clear
      setTimeout(() => setClickedId(null), 100);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minHeight: '80%' }}>
      {/* Title */}
      <div>
        <h2 className="section-title">
          Shared Element <span className="gradient-text">Transitions</span>
        </h2>
        <p className="section-desc">
          Click any cosmic anomaly below to open its detailed logs. The browser takes screenshots of the card elements and morphs their shapes and sizes seamlessly.
        </p>
      </div>

      {activeItem ? (
        /* DETAIL VIEW */
        <div 
          className="glass-panel"
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '900px',
            width: '100%',
            margin: '0 auto',
            viewTransitionName: 'active-card-bg'
          } as any}
        >
          {/* Card Hero Image — per-item name matches the grid card AND the
              Dashboard thumbnail, so the same image morphs across pages */}
          <div
            style={{
              height: '350px',
              background: activeItem.gradient,
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '40px',
              viewTransitionName: `anomaly-${activeItem.id}`,
              viewTransitionClass: 'anomaly-media'
            } as any}
          >
            {/* Ambient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(6, 6, 12, 0.95) 0%, rgba(6, 6, 12, 0.2) 100%)',
              zIndex: 1
            }} />
            
            {/* Back Button */}
            <button
              onClick={handleBack}
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(15, 15, 27, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowLeft style={{ width: '20px', height: '20px' }} />
            </button>

            <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ 
                alignSelf: 'flex-start',
                background: 'var(--primary)', 
                color: '#fff', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                padding: '4px 10px', 
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {activeItem.category}
              </span>
              <h3 
                style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800,
                  viewTransitionName: 'active-card-title'
                } as any}
              >
                {activeItem.title}
              </h3>
            </div>
          </div>

          {/* Details Content */}
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
                <span>{activeItem.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass style={{ width: '16px', height: '16px', color: 'var(--secondary)' }} />
                <span>Sector Active Navigation</span>
              </div>
            </div>

            <p style={{ 
              color: 'var(--text-primary)', 
              fontSize: '1.1rem', 
              lineHeight: '1.7',
              borderLeft: '4px solid var(--primary)',
              paddingLeft: '20px'
            }}>
              {activeItem.description}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              {activeItem.extendedDesc}
            </p>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto'
        }}>
          {ANOMALIES.map((item) => {
            const isTarget = clickedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  viewTransitionName: isTarget ? 'active-card-bg' : undefined
                } as any}
              >
                {/* Visual Image Area — always named (unique per item), so it
                    morphs from the Dashboard thumbnail on page entry and into
                    the detail hero on selection */}
                <div
                  style={{
                    height: '180px',
                    background: item.gradient,
                    position: 'relative',
                    viewTransitionName: `anomaly-${item.id}`,
                    viewTransitionClass: 'anomaly-media'
                  } as any}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(6, 6, 12, 0.8) 0%, transparent 80%)'
                  }} />
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '16px', 
                    left: '16px',
                    background: 'rgba(15, 15, 27, 0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    {item.category}
                  </span>
                </div>

                {/* Card Content Area */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                  <h4 
                    style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 700,
                      viewTransitionName: isTarget ? 'active-card-title' : undefined
                    } as any}
                  >
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '12px' }}>
                    <Compass style={{ width: '12px', height: '12px' }} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
