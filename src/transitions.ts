export type TransitionType =
  | 'fade'
  | 'cinema'
  | 'wipe'
  | 'circle-reveal'
  | 'focus-blur'
  | 'center-split'
  | 'velocity'
  | 'blinds-down'
  | 'blinds-up'
  | 'blinds-left'
  | 'blinds-right'
  | 'reflection'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'cube-left'
  | 'cube-right'
  | 'cube-up'
  | 'cube-down'
  | 'card-flip'
  | 'swing';

export interface TransitionInfo {
  name: string;
  className: string;
  description: string;
}

export const TRANSITIONS: Record<TransitionType, TransitionInfo> = {
  fade: {
    name: 'Fade',
    className: 'fade-transition',
    description: 'A classic cross-fade transition blending the opacity of the old and new pages.'
  },
  cinema: {
    name: 'Cinema Scale',
    className: 'cinema-transition',
    description: 'A cinematic transition where the old page scales down and fades, and the new page scales up and fades in.'
  },
  wipe: {
    name: 'Wipe Reveal',
    className: 'wipe-transition',
    description: 'A sweeping linear wipe reveal from left to right using CSS clip-path: inset.'
  },
  'circle-reveal': {
    name: 'Circle Clip Reveal',
    className: 'circle-reveal-transition',
    description: 'A coordinate-aware circular mask that expands from your mouse click position. Highly dynamic!'
  },
  'focus-blur': {
    name: 'Focus Blur',
    className: 'focus-blur-transition',
    description: 'The old page defocuses into a soft blur while the new page sharpens into focus with a gentle zoom.'
  },
  'center-split': {
    name: 'Center Split',
    className: 'center-split-transition',
    description: 'The new page is revealed from a vertical seam in the center, expanding outward over the fading old page.'
  },
  velocity: {
    name: 'Velocity Skew',
    className: 'velocity-transition',
    description: 'A high-speed dash — pages skew with motion as the old one rockets left and the new one streaks in from the right.'
  },
  'blinds-down': {
    name: 'Blinds Down',
    className: 'blinds-down-transition',
    description: 'Horizontal venetian slats sweep downward until they merge into the new page — Keynote-style.'
  },
  'blinds-up': {
    name: 'Blinds Up',
    className: 'blinds-up-transition',
    description: 'Horizontal venetian slats sweep upward until they merge into the new page.'
  },
  'blinds-left': {
    name: 'Blinds Left',
    className: 'blinds-left-transition',
    description: 'Vertical venetian slats sweep leftward until they merge into the new page.'
  },
  'blinds-right': {
    name: 'Blinds Right',
    className: 'blinds-right-transition',
    description: 'Vertical venetian slats sweep rightward until they merge into the new page.'
  },
  reflection: {
    name: 'Reflection',
    className: 'reflection-transition',
    description: 'Keynote-style glossy stage — the panel dollies back to reveal a mirrored reflection, glides across the floor, then docks forward.'
  },
  'slide-left': {
    name: 'Slide Left',
    className: 'slide-left-transition',
    description: 'The old page slides out to the left while the new page slides in from the right.'
  },
  'slide-right': {
    name: 'Slide Right',
    className: 'slide-right-transition',
    description: 'The old page slides out to the right while the new page slides in from the left.'
  },
  'slide-up': {
    name: 'Slide Up',
    className: 'slide-up-transition',
    description: 'The old page slides up and away while the new page rises in from the bottom.'
  },
  'slide-down': {
    name: 'Slide Down',
    className: 'slide-down-transition',
    description: 'The old page drops away while the new page slides down from the top.'
  },
  'cube-left': {
    name: 'Cube Left',
    className: 'cube-left-transition',
    description: 'The panel spins like a 3D cube rotating left — the new page swings in from the right face.'
  },
  'cube-right': {
    name: 'Cube Right',
    className: 'cube-right-transition',
    description: 'The panel spins like a 3D cube rotating right — the new page swings in from the left face.'
  },
  'cube-up': {
    name: 'Cube Up',
    className: 'cube-up-transition',
    description: 'The 3D cube tips upward — the new page swings up from the bottom face.'
  },
  'cube-down': {
    name: 'Cube Down',
    className: 'cube-down-transition',
    description: 'The 3D cube tips downward — the new page swings down from the top face.'
  },
  'card-flip': {
    name: 'Card Flip',
    className: 'card-flip-transition',
    description: 'The panel flips in place like a card — the old page rotates edge-on before the new page completes the turn.'
  },
  swing: {
    name: 'Swing Doors',
    className: 'swing-transition',
    description: 'The old page swings away on its left hinge while the new page swings in on its right hinge, like saloon doors in perspective.'
  }
};

export const DEFAULT_TRANSITION: TransitionType = 'cinema';

const STORAGE_KEY = 'app-page-transition';

/* Values stored before transitions became directional */
const LEGACY_VALUES: Record<string, TransitionType> = {
  slide: 'slide-right',
  cube: 'cube-left',
  blinds: 'blinds-down'
};

export function loadTransition(): TransitionType {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      if (stored in TRANSITIONS) {
        return stored as TransitionType;
      }
      if (stored in LEGACY_VALUES) {
        return LEGACY_VALUES[stored];
      }
    }
  } catch {
    // localStorage unavailable (private mode, etc.)
  }
  return DEFAULT_TRANSITION;
}

export function saveTransition(type: TransitionType) {
  try {
    localStorage.setItem(STORAGE_KEY, type);
  } catch {
    // ignore
  }
}

/* Blinds slat thickness (px). Stored separately from the transition choice;
   applied as the --blinds-band CSS variable that the blinds mask-image reads. */
const BLINDS_BAND_KEY = 'app-blinds-band';
export const DEFAULT_BLINDS_BAND = 48;
export const MIN_BLINDS_BAND = 16;
export const MAX_BLINDS_BAND = 160;

export function loadBlindsBand(): number {
  try {
    const v = parseInt(localStorage.getItem(BLINDS_BAND_KEY) ?? '', 10);
    if (Number.isFinite(v) && v >= MIN_BLINDS_BAND && v <= MAX_BLINDS_BAND) {
      return v;
    }
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_BLINDS_BAND;
}

export function saveBlindsBand(px: number) {
  try {
    localStorage.setItem(BLINDS_BAND_KEY, String(px));
  } catch {
    // ignore
  }
}

export function applyBlindsBand(px: number) {
  document.documentElement.style.setProperty('--blinds-band', `${px}px`);
}

/* The circle-reveal clip-path resolves --click-x/--click-y in the animated
   snapshot's own coordinate space. Content-scoped transitions therefore need
   coords relative to .main-content (pass `scope`); root-scoped ones (theme
   toggle) use raw viewport coords (omit `scope`). Clears stale coords when
   no event is available so keyframes fall back to center. */
export function setClickCoords(
  e?: { clientX: number; clientY: number },
  scope?: Element | null
) {
  const style = document.documentElement.style;
  if (!e) {
    style.removeProperty('--click-x');
    style.removeProperty('--click-y');
    return;
  }
  let x = e.clientX;
  let y = e.clientY;
  if (scope) {
    const rect = scope.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
  }
  style.setProperty('--click-x', `${x}px`);
  style.setProperty('--click-y', `${y}px`);
}
