import { BookOpen, ExternalLink, Code, CheckCircle } from 'lucide-react';

export default function DocsPanel() {
  const sources = [
    {
      title: "Rote Code Fraktion - Page Transitions Guide",
      url: "https://www.rotecodefraktion.de/en/blog/css-view-transitions-zwischen-seiten/",
      summary: "Explains how the browser handles View Transitions by rendering a snapshot tree (::view-transition, ::view-transition-group(root), ::view-transition-old(root), ::view-transition-new(root)). Details how to bind components using custom view-transition-names."
    },
    {
      title: "Animate Between Pages (Chrome 126+ Cross-Document)",
      url: "https://www.youtube.com/watch?v=XH1G58QqPIM",
      summary: "Covers the newly released Multi-Page transition support. By declaring `@view-transition { navigation: auto; }` in CSS, browsers will automatically animate static navigation between different HTML documents."
    },
    {
      title: "Shared Element Transitions Tutorial",
      url: "https://www.youtube.com/watch?v=caXbgH-cZGQ",
      summary: "Walks through linking list cards to detail screens in SPAs. By tagging elements with identical `view-transition-name` properties, the browser calculates position differences and animates layout changes."
    },
    {
      title: "Animate From Nothing (@starting-style)",
      url: "https://www.youtube.com/watch?v=BvM8iq2DPgA",
      summary: "Teaches how to animate elements changing from `display: none` to visible using `@starting-style` and `transition-behavior: allow-discrete` to keep elements in the DOM top layer during transitions."
    },
    {
      title: "Customizing Page View Transitions",
      url: "https://youtu.be/mCmcvcfiyQE?si=kvdrDbNRIcEeYrvU",
      summary: "Covers overriding default crossfades with custom CSS animations (slide, cinema scale, wipe reveals) by targeting pseudo-elements like `::view-transition-new(root)` and `::view-transition-old(root)`."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Title */}
      <div>
        <h2 className="section-title">
          Native CSS <span className="gradient-text">Docs & Synthesis</span>
        </h2>
        <p className="section-desc">
          Technical summaries of modern CSS features gathered from the provided educational videos and blog posts.
        </p>
      </div>

      {/* Synthesis Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        
        {/* Source References */}
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen style={{ width: '18px', height: '18px', color: 'var(--primary)' }} />
            Curated Sources
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sources.map((src, index) => (
              <div key={index} style={{ borderBottom: index < sources.length - 1 ? '1px solid var(--border-light)' : 'none', paddingBottom: '16px' }}>
                <a 
                  href={src.url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '4px'
                  }}
                  className="docs-link"
                >
                  {src.title}
                  <ExternalLink style={{ width: '12px', height: '12px', color: 'var(--primary)' }} />
                </a>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>{src.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Playgrounds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Starting Style Code Card */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code style={{ width: '16px', height: '16px', color: 'var(--secondary)' }} />
              CSS @starting-style Pattern
            </h4>
            <pre style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '16px',
              borderRadius: '8px',
              overflowX: 'auto',
              fontSize: '0.75rem',
              color: '#d8b4fe',
              fontFamily: 'monospace',
              lineHeight: '1.4',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
{`/* 1. Base Closed State */
dialog {
  opacity: 0;
  display: none;
  transition: opacity 0.4s, 
              display 0.4s allow-discrete, 
              overlay 0.4s allow-discrete;
}

/* 2. Open State */
dialog[open] {
  opacity: 1;
  display: block;
}

/* 3. Transition Entry Starting Point */
@starting-style {
  dialog[open] {
    opacity: 0;
  }
}`}
            </pre>
          </div>

          {/* View Transition Code Card */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
              View Transition SPA Trigger
            </h4>
            <pre style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '16px',
              borderRadius: '8px',
              overflowX: 'auto',
              fontSize: '0.75rem',
              color: '#a5f3fc',
              fontFamily: 'monospace',
              lineHeight: '1.4',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
{`// Javascript trigger in Single Page Apps
function switchTab(newTab) {
  if (!document.startViewTransition) {
    setTab(newTab);
    return;
  }
  
  document.startViewTransition(() => {
    setTab(newTab);
  });
}`}
            </pre>
          </div>

        </div>

      </div>

      {/* Synthesis Summary */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--secondary)' }} />
          Architectural Takeaways
        </h3>
        
        <ul style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem', 
          lineHeight: '1.7', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          paddingLeft: '20px'
        }}>
          <li>
            <strong>Framer-free animations:</strong> By declaring animations natively, page payload sizes are reduced significantly (no need to bundle massive JS transition engines).
          </li>
          <li>
            <strong>Discrete Property Transitions:</strong> Historically, animating `display` was impossible without timeouts since changing it to `none` instantly broke animations. The `transition-behavior: allow-discrete` rule fixes this, postponing display toggle until other transitions finish.
          </li>
          <li>
            <strong>Coordinate-Aware Transitions:</strong> Combined with CSS variables, the View Transitions API can capture mouse coordinates during clicks and build circular clip reveals relative to where the user clicked.
          </li>
        </ul>
      </div>

      <style>{`
        .docs-link:hover {
          color: var(--primary) !important;
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
}
