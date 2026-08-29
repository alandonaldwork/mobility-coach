export interface DeskResetItem {
  id: number;
  timeRange: string;
  name: string;
  exerciseId: number;
  dose: string;
  durationSeconds: number;
  targetRegion: string;
  cues: string;
}

export const DESK_RESET_ROUTINE: DeskResetItem[] = [
  {
    id: 1,
    timeRange: '0:00–0:30',
    name: 'Standing Ankle Circles/Pumps',
    exerciseId: 5, // Variant of #1/5
    dose: '8 circles each direction/side',
    durationSeconds: 30,
    targetRegion: 'Ankles',
    cues: 'Isolate movement to ankle joint, keep knee steady.',
  },
  {
    id: 2,
    timeRange: '0:30–1:15',
    name: 'Standing Half-Kneeling / Lunge Hip Flexor Stretch',
    exerciseId: 8,
    dose: '20 sec/side',
    durationSeconds: 45,
    targetRegion: 'Hip Flexors',
    cues: 'Squeeze back glute, tuck pelvis under, keep chest upright.',
  },
  {
    id: 3,
    timeRange: '1:15–1:45',
    name: 'Standing Figure-4 Glute Stretch',
    exerciseId: 11,
    dose: '20 sec/side',
    durationSeconds: 30,
    targetRegion: 'Glutes & Piriformis',
    cues: 'Cross ankle over opposite knee, sit hips back, hand on wall for balance.',
  },
  {
    id: 4,
    timeRange: '1:45–2:15',
    name: 'Doorway / Wall Chest-Shoulder Stretch',
    exerciseId: 21,
    dose: '20 sec/side',
    durationSeconds: 30,
    targetRegion: 'Pectorals & Anterior Shoulder',
    cues: 'Forearm on wall/doorway at 90 deg, step forward gently through doorway.',
  },
  {
    id: 5,
    timeRange: '2:15–2:55',
    name: 'Standing Open Book or Chair-Back Thoracic Extension',
    exerciseId: 13,
    dose: '8 slow reps',
    durationSeconds: 40,
    targetRegion: 'Thoracic Spine',
    cues: 'Extend over chair back or sweep arm open in standing position.',
  },
  {
    id: 6,
    timeRange: '2:55–3:25',
    name: 'Chin Tucks',
    exerciseId: 24,
    dose: '10 reps, 2 sec hold',
    durationSeconds: 30,
    targetRegion: 'Deep Neck Flexors',
    cues: 'Make double chin straight backward, hold 2 sec.',
  },
  {
    id: 7,
    timeRange: '3:25–5:00',
    name: '10 Bodyweight Squats + March in Place',
    exerciseId: 10,
    dose: '~90 sec circulation booster',
    durationSeconds: 90,
    targetRegion: 'Full Body Circulation',
    cues: '10 crisp bodyweight squats followed by brisk march to get blood moving.',
  },
];
