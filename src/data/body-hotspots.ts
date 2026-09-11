import { BodyRegion } from '../types';

export interface Hotspot {
  id: string;
  label: string;
  subtitle: string;
  region: BodyRegion;
  view: 'front' | 'back';
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  description: string;
  commonIssues: string[];
}

export const BODY_HOTSPOTS: Hotspot[] = [
  // --- FRONT VIEW ---
  {
    id: 'neck-front',
    label: 'Neck & Traps',
    subtitle: 'Upper Cervical & Scalenes',
    region: 'neck',
    view: 'front',
    x: 50,
    y: 15,
    description: 'Relieves forward-head posture tension, desk stiffness, and neck strain.',
    commonIssues: ['Tech Neck', 'Upper Trap Spasms', 'Cervical Compression'],
  },
  {
    id: 'shoulders-front',
    label: 'Shoulders & Chest',
    subtitle: 'Anterior Delts & Pecs',
    region: 'shoulder',
    view: 'front',
    x: 31,
    y: 23,
    description: 'Opens rounded shoulders, improves overhead reaching capacity and chest expansion.',
    commonIssues: ['Rounded Shoulders', 'Impingement Risk', 'Restricted Reach'],
  },
  {
    id: 'thoracic-front',
    label: 'Thoracic & Ribcage',
    subtitle: 'Mid-Spine & Diaphragm',
    region: 'thoracic',
    view: 'front',
    x: 50,
    y: 31,
    description: 'Restores spinal rotation and rib cage mobility for deep breathing and posture.',
    commonIssues: ['Hunched Back', 'Restricted Breathing', 'Stiff Mid-Back'],
  },
  {
    id: 'wrists-front',
    label: 'Wrists & Forearms',
    subtitle: 'Flexors & Extensors',
    region: 'wrist',
    view: 'front',
    x: 18,
    y: 47,
    description: 'Crucial for keyboard workers, lifters, and athletes experiencing wrist strain.',
    commonIssues: ['Typing Fatigue', 'Grip Tightness', 'Carpal Stress'],
  },
  {
    id: 'hips-front',
    label: 'Hip Flexors & Psoas',
    subtitle: 'Anterior Pelvis & Groin',
    region: 'hip',
    view: 'front',
    x: 43,
    y: 52,
    description: 'Counters hours of sitting by releasing tight hip flexors and unlocking pelvic tilt.',
    commonIssues: ['Tight Hip Flexors', 'Anterior Pelvic Tilt', 'Groin Stiffness'],
  },
  {
    id: 'knees-front',
    label: 'Quads & Knees',
    subtitle: 'Patellar Tendon & Femoral Range',
    region: 'hip',
    view: 'front',
    x: 42,
    y: 68,
    description: 'Decreases quad tension, improves knee tracking and deep squat comfort.',
    commonIssues: ['Patellofemoral Pain', 'Tight Rectus Femoris', 'Squat Depth Blocks'],
  },
  {
    id: 'ankles-front',
    label: 'Ankles & Shins',
    subtitle: 'Dorsiflexion & Tibialis',
    region: 'ankle',
    view: 'front',
    x: 44,
    y: 89,
    description: 'Restores deep ankle dorsiflexion, preventing knee cave and improving athletic bounce.',
    commonIssues: ['Limited Dorsiflexion', 'Shin Tightness', 'Squat Heel Rise'],
  },

  // --- BACK VIEW ---
  {
    id: 'neck-back',
    label: 'Suboccipitals & Upper Traps',
    subtitle: 'Posterior Neck & Base of Skull',
    region: 'neck',
    view: 'back',
    x: 50,
    y: 14,
    description: 'Relieves tension headaches, stress knotting, and neck extension limitations.',
    commonIssues: ['Tension Headaches', 'Stiff Neck Extension', 'Stress Knots'],
  },
  {
    id: 'thoracic-back',
    label: 'Thoracic Spine & Scapula',
    subtitle: 'Rhomboids & Mid-Traps',
    region: 'thoracic',
    view: 'back',
    x: 50,
    y: 28,
    description: 'Releases knotting between shoulder blades and restores twisting range.',
    commonIssues: ['Rhomboid Spasms', 'Rotational Lock', 'Stiff Thoracic Kyphosis'],
  },
  {
    id: 'shoulders-back',
    label: 'Rotator Cuff & Lats',
    subtitle: 'Infraspinatus & Latissimus Dorsi',
    region: 'shoulder',
    view: 'back',
    x: 32,
    y: 25,
    description: 'Releases pulling muscles, shoulder blade impingement, and posterior capsules.',
    commonIssues: ['Tight Lats', 'Rotator Cuff Irritation', 'Overhead Blocks'],
  },
  {
    id: 'lowerback-back',
    label: 'Lower Back & Glutes',
    subtitle: 'Lumbar Spine & Piriformis',
    region: 'hip',
    view: 'back',
    x: 50,
    y: 49,
    description: 'Decompresses the lumbar spine and releases deep piriformis and gluteal tension.',
    commonIssues: ['Lower Back Ache', 'Sciatic / Piriformis Grip', 'Prolonged Chair Strain'],
  },
  {
    id: 'hamstrings-back',
    label: 'Hamstrings & Posterior Chain',
    subtitle: 'Biceps Femoris & Semitendinosus',
    region: 'hip',
    view: 'back',
    x: 43,
    y: 65,
    description: 'Lengthens tight hamstrings, protects lower back during bending, and improves stride.',
    commonIssues: ['Hamstring Pulls', 'Pelvic Posterior Pull', 'Restricted Forward Fold'],
  },
  {
    id: 'calves-back',
    label: 'Calves & Achilles',
    subtitle: 'Gastrocnemius & Soleus',
    region: 'ankle',
    view: 'back',
    x: 44,
    y: 83,
    description: 'Prevents Achilles tendonitis, plantaris strain, and calf cramping.',
    commonIssues: ['Achilles Stiffness', 'Tight Gastroc', 'Plantar Tension'],
  },
];

export const getHotspotById = (id: string): Hotspot | undefined => {
  return BODY_HOTSPOTS.find((h) => h.id === id);
};

export const getHotspotsByView = (view: 'front' | 'back'): Hotspot[] => {
  return BODY_HOTSPOTS.filter((h) => h.view === view);
};
