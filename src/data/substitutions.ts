export interface EquipmentSubstitution {
  missingEquipment: string;
  alternative: string;
  instructions: string;
  affectedExercises: string[];
}

export const EQUIPMENT_SUBSTITUTIONS: EquipmentSubstitution[] = [
  {
    missingEquipment: 'Resistance Band',
    alternative: 'Towel or Light Isometric Hold',
    instructions: 'For Band External Rotation or Band Pull-Aparts, hold a non-stretchy towel taut with light outward isometric pressure, or perform active bodyweight scapular squeezes.',
    affectedExercises: ['Band Pull-Aparts', 'Band External Rotation at 90/90', 'Half-Kneeling Banded Ankle Distraction'],
  },
  {
    missingEquipment: 'Foam Roller',
    alternative: 'Tennis / Lacrosse Ball or Rolled-up Towel',
    instructions: 'Use a firm lacrosse/tennis ball for targeted SMR on calves, glutes, and lats. For thoracic extension, place a tightly rolled bath towel horizontally under your mid-back.',
    affectedExercises: ['Thoracic Extension Over Foam Roller', 'Recovery SMR Foam Rolling'],
  },
  {
    missingEquipment: 'Wall',
    alternative: 'Chairs or Doorframe',
    instructions: 'Use two heavy chairs pushed together or a sturdy doorframe for balance during ankle mobilizations, chest stretches, and overhead reaches.',
    affectedExercises: ['Knee-to-Wall Dorsiflexion Mobilization', 'Scapular Wall Slides', 'Wall Overhead Reach', 'Soleus Wall Calf Stretch'],
  },
  {
    missingEquipment: 'Mat / Floor Space',
    alternative: 'Standing or Chair-Based Variants',
    instructions: 'Use standing desk reset variants: Standing Figure-4, Standing Open Book against chair back, and Standing Lunge Hip Flexor Stretch.',
    affectedExercises: ['90/90 Hip Switches', 'Couch Stretch', 'Open Book Thoracic Rotation', 'Sleeper Stretch'],
  },
];
