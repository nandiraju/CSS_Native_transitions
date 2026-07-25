import { useState } from 'react';
import { Settings, Check, Info } from 'lucide-react';
import {
  TRANSITIONS,
  loadBlindsBand,
  saveBlindsBand,
  applyBlindsBand,
  MIN_BLINDS_BAND,
  MAX_BLINDS_BAND,
  type TransitionType
} from '../transitions';

interface SettingsPanelProps {
  transition: TransitionType;
  onChangeTransition: (type: TransitionType) => void;
}

const GROUPS: { label: string; keys: TransitionType[] }[] = [
  { label: 'Effects', keys: ['fade', 'cinema', 'wipe', 'circle-reveal'] },
  { label: 'Fancy', keys: ['focus-blur', 'center-split', 'velocity', 'reflection'] },
  { label: 'Blinds', keys: ['blinds-down', 'blinds-up', 'blinds-left', 'blinds-right'] },
  { label: 'Slide', keys: ['slide-left', 'slide-right', 'slide-up', 'slide-down'] },
  { label: '3D Cube', keys: ['cube-left', 'cube-right', 'cube-up', 'cube-down'] },
  { label: '3D Flip', keys: ['card-flip', 'swing'] },
];

export default function SettingsPanel({ transition, onChangeTransition }: SettingsPanelProps) {
  const [blindsBand, setBlindsBand] = useState<number>(loadBlindsBand);

  const changeBlindsBand = (px: number) => {
    setBlindsBand(px);
    saveBlindsBand(px);
    applyBlindsBand(px);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title */}
      <div>
        <h2 className="section-title">
          App <span className="gradient-text">Settings</span>
        </h2>
        <p className="section-desc">
          Choose the view transition used every time you navigate between pages in the sidebar. Your choice is saved locally and restored on your next visit.
        </p>
      </div>

      {/* Transition Picker */}
      <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '760px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings style={{ width: '18px', height: '18px', color: 'var(--primary)' }} />
          Page Transition Style
        </h3>

        {GROUPS.map((group) => (
          <div key={group.label} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)'
            }}>
              {group.label}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '14px' }}>
              {group.keys.map((key) => {
                const info = TRANSITIONS[key];
                const isActive = transition === key;
                return (
                  <button
                    key={key}
                    onClick={() => onChangeTransition(key)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '16px 18px',
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--primary)' : 'var(--border-light)',
                      background: isActive ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.95rem' }}>
                      {info.name}
                      {isActive && <Check style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {info.description}
                    </span>
                  </button>
                );
              })}
            </div>
            {group.label === 'Blinds' && (
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ whiteSpace: 'nowrap' }}>Slat size</span>
                <input
                  type="range"
                  min={MIN_BLINDS_BAND}
                  max={MAX_BLINDS_BAND}
                  step={8}
                  value={blindsBand}
                  onChange={(e) => changeBlindsBand(Number(e.target.value))}
                  style={{ flexGrow: 1, accentColor: 'var(--primary)' }}
                />
                <span style={{ minWidth: '48px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {blindsBand}px
                </span>
              </label>
            )}
          </div>
        ))}

        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          <Info style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '2px', color: 'var(--secondary)' }} />
          <p>
            The selected style applies to sidebar navigation and dashboard shortcuts. The Circle Clip Reveal expands from wherever you click. Animations stay confined to this content panel — the sidebar never moves.
          </p>
        </div>
      </div>
    </div>
  );
}
