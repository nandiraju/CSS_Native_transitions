export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  gradient: string;
  description: string;
  extendedDesc: string;
}

/* Shared by Dashboard (thumbnails) and SharedElementDemo (gallery + detail).
   Each item's visual carries view-transition-name: anomaly-<id>, which is what
   lets the browser morph the same image between the two pages. */
export const ANOMALIES: GalleryItem[] = [
  {
    id: 'orion',
    title: 'Orion Nebula Sanctuary',
    category: 'Stellar Nursery',
    location: '24 Orion Arm, Sector 4',
    gradient: 'linear-gradient(135deg, #701a75 0%, #4a044e 100%)',
    description: 'A vibrant stellar nursery teeming with newborn star clusters and rich interstellar dust clouds.',
    extendedDesc: 'The Orion Nebula Sanctuary represents a major active star formation region located approximately 1,344 light-years away. Within its gaseous boundaries, cosmic winds sculpt massive hydrogen columns while ultraviolet radiation from massive Trapezium stars ionizes the surrounding nebula, causing it to glow with brilliant pink, violet, and magenta hues. It serves as a natural laboratory for studying planetary disk formation.'
  },
  {
    id: 'andromeda',
    title: 'Andromeda Core Gateway',
    category: 'Spiral Galaxy Core',
    location: 'M31 galactic coordinates',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
    description: 'The dense nucleus of our sister spiral galaxy, radiating with the glow of ancient star clusters.',
    extendedDesc: 'Andromeda Core Gateway is the supermassive black hole nucleus of our closest galactic neighbor, the Andromeda Galaxy. Home to a dense double star cluster and an accretion disc of hundreds of ancient yellow stars, the core radiates energy across all spectral bands. The gravitational mechanics at the core govern the orbital velocity of the outer spiral arms, which are locked in a cosmic collision course with our own Milky Way.'
  },
  {
    id: 'cygnus',
    title: 'Cygnus Supernova remnants',
    category: 'Supernova Remnant',
    location: 'Cygnus Loop, Outer Ring',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #451a03 100%)',
    description: 'Expanding shockwaves of gas created when a massive stellar core collapsed eons ago.',
    extendedDesc: 'The Cygnus Supernova Remnant is a vast shell of expanding gas created by the explosion of a star 20 times more massive than our Sun, which occurred roughly 20,000 years ago. Today, the supersonic shockwaves collide with cold interstellar clouds, heating the gas to millions of degrees and creating intricate glowing filaments of sulfur, hydrogen, and oxygen. The nebula expands at over 170 kilometers per second.'
  }
];
