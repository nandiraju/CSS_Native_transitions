import { useRef, useState } from 'react';
import { Layers, Monitor, Play, Plus, Trash2, HelpCircle, X } from 'lucide-react';

interface ListItem {
  id: number;
  text: string;
}

export default function TopLayerDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [list, setList] = useState<ListItem[]>([
    { id: 1, text: 'Analyze View Transitions API specification' },
    { id: 2, text: 'Deploy @starting-style in popovers' },
  ]);
  const [counter, setCounter] = useState(3);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const addItem = () => {
    setList([...list, { id: counter, text: `Cosmic telemetry log stream #${counter}` }]);
    setCounter(counter + 1);
  };

  const removeItem = (id: number) => {
    setList(list.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title */}
      <div>
        <h2 className="section-title">
          Top Layer & <span className="gradient-text">@starting-style</span>
        </h2>
        <p className="section-desc">
          Native CSS-only entry and exit animations. By setting `transition-behavior: allow-discrete`, the browser allows `display: none` and `overlay` properties to transition smoothly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '32px' }}>
        
        {/* Interactive Triggers */}
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Monitor style={{ width: '18px', height: '18px', color: 'var(--accent)' }} />
            Native Elements
          </h3>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Interact with standard HTML <code>&lt;dialog&gt;</code> elements and elements using the Popover API. The transitions are managed entirely inside <code>src/index.css</code> via <code>@starting-style</code>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {/* Modal Dialog Trigger */}
            <button
              onClick={openDialog}
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--accent) 0%, #b91c1c 100%)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(244, 63, 94, 0.25)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Layers style={{ width: '16px', height: '16px' }} />
              Open Dialog Modal
            </button>

            {/* Sidebar Drawer Trigger */}
            <button
              popoverTarget="my-drawer"
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
            >
              <Play style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
              Toggle Side Drawer
            </button>

            {/* Context Tooltip Trigger */}
            <button
              popoverTarget="my-popover"
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
            >
              <HelpCircle style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
              Toggle Hover Popover
            </button>
          </div>
        </div>

        {/* Dynamic List Items Demo */}
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>DOM Entry Transitions</h3>
            <button 
              onClick={addItem}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Plus style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Items added to this list are animated natively upon creation. Notice they slide down and fade in from height: 0 without requiring React transition group packages!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
            {list.map((item) => (
              <div 
                key={item.id} 
                className="list-item"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '12px 16px', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '85%' }}>{item.text}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RENDER ELEMENTS FOR TOP LAYER */}

      {/* 1. HTML Dialog Modal */}
      <dialog 
        ref={dialogRef}
        className="modern-dialog glass-panel"
        style={{
          border: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-main)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Telemetry Authorization</h4>
          <button 
            onClick={closeDialog}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          This modal dialog slides and scales into view, while the backdrop fades in with a blur. Closing the modal will slide it back down and fade out the backdrop, thanks to discrete display transition behavior.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%', marginTop: '8px' }}>
          <button 
            onClick={closeDialog}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={closeDialog}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            Authorize
          </button>
        </div>
      </dialog>

      {/* 2. Side Drawer (Popover API) */}
      <div 
        popover="auto"
        id="my-drawer" 
        className="modern-drawer glass-panel"
        style={{
          backgroundColor: 'var(--bg-main)',
          borderLeft: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Telemetry Console</h4>
          <button 
            // Native popover close trigger by target ID
            popoverTarget="my-drawer"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
          An active side-drawer utilizing the HTML Popover API. It renders directly into the browser's top layer.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.8rem' }}>
            <strong>Session Duration:</strong> 00:45:12
          </div>
          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.8rem' }}>
            <strong>Active Threads:</strong> 14 Web Workers
          </div>
        </div>
      </div>

      {/* 3. Small Hover Popover (Popover API) */}
      <div 
        popover="auto"
        id="my-popover" 
        className="modern-popover glass-panel"
        style={{
          backgroundColor: 'var(--bg-main)',
          border: '1px solid var(--border-light)',
        }}
      >
        <h5 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px' }}>Popover API Helper</h5>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
          Popovers automatically support "light dismiss", meaning clicking anywhere outside will close it immediately.
        </p>
      </div>

      <style>{`
        /* Local Starting Styles for DOM entry items */
        .list-item {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @starting-style {
          .list-item {
            opacity: 0;
            transform: translateY(-16px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
