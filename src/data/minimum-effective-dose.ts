export interface MEDItem {
  id: number;
  name: string;
  exerciseIds: number[];
  dose: string;
  durationSeconds: number;
  targetRegion: string;
}

export const MINIMUM_EFFECTIVE_DOSE: MEDItem[] = [
  {
    id: 1,
    name: 'Ankle CARs + Knee-to-Wall Dorsiflexion',
    exerciseIds: [1, 2],
    dose: '1 min combined flow',
    durationSeconds: 60,
    targetRegion: 'Ankles',
  },
  {
    id: 2,
    name: 'Deep Squat Rock',
    exerciseIds: [10],
    dose: '1 min active rock',
    durationSeconds: 60,
    targetRegion: 'Hips & Ankles',
  },
  {
    id: 3,
    name: '90/90 Hip Switches',
    exerciseIds: [6],
    dose: '1 min smooth switches',
    durationSeconds: 60,
    targetRegion: 'Hip Rotation',
  },
  {
    id: 4,
    name: "World's Greatest Stretch",
    exerciseIds: [7],
    dose: '1.5 min dynamic flow (3-4 reps/side)',
    durationSeconds: 90,
    targetRegion: 'Hip, Hamstring & T-Spine',
  },
  {
    id: 5,
    name: 'Open Book Rotation',
    exerciseIds: [13],
    dose: '1 min (5 reps/side)',
    durationSeconds: 60,
    targetRegion: 'Thoracic Spine',
  },
  {
    id: 6,
    name: 'Scapular Wall Slides + Band Pull-Apart',
    exerciseIds: [17, 18],
    dose: '1.5 min combined activation',
    durationSeconds: 90,
    targetRegion: 'Shoulders & Upper Back',
  },
  {
    id: 7,
    name: 'Chin Tucks + Neck Rotation',
    exerciseIds: [24, 27],
    dose: '1 min neck reset',
    durationSeconds: 60,
    targetRegion: 'Neck',
  },
  {
    id: 8,
    name: 'Wrist Circles',
    exerciseIds: [29],
    dose: '30 sec active circles',
    durationSeconds: 30,
    targetRegion: 'Wrists',
  },
];
