import { AssessmentDefinition } from '../types';

export const MOBILITY_ASSESSMENTS: AssessmentDefinition[] = [
  {
    id: 'knee_to_wall',
    name: 'Knee-to-Wall Ankle Test',
    targetRegion: 'ankle',
    description: 'Measures closed-chain ankle dorsiflexion range of motion.',
    instructions: [
      'Set up half-kneeling facing a wall.',
      'Place big toe 2-4 inches away from wall.',
      'Drive knee straight over 2nd toe to touch the wall without lifting heel.',
      'Move foot back until heel just begins to lift; measure toe-to-wall distance.',
    ],
    metricType: 'distance',
  },
  {
    id: 'deep_squat',
    name: 'Deep Squat Assessment',
    targetRegion: 'hip',
    description: 'Evaluates multi-joint squat depth, torso angle, and heel stability.',
    instructions: [
      'Stand feet shoulder-width apart, toes slightly turned out.',
      'Squat as deep as possible keeping heels flat and chest up.',
      'Note depth, spine position, and whether one side collapses first.',
    ],
    metricType: 'qualitative',
  },
  {
    id: 'hip_90_90',
    name: '90/90 Hip Rotation Test',
    targetRegion: 'hip',
    description: 'Assesses active internal and external hip rotation symmetry.',
    instructions: [
      'Sit on floor with front leg and back leg bent at 90 degrees.',
      'Keep torso upright without leaning heavily onto hands.',
      'Compare feel, tightness, and upright angle between left and right lead leg.',
    ],
    metricType: 'symmetry',
  },
  {
    id: 'couch_stretch_check',
    name: 'Hip Extension Check (Couch Stretch)',
    targetRegion: 'hip',
    description: 'Evaluates anterior hip flexor and quad length balance.',
    instructions: [
      'Set up in couch stretch with back shin vertical against wall.',
      'Squeeze glute and bring torso upright.',
      'Compare how close torso reaches vertical on left vs right side without arching low back.',
    ],
    metricType: 'symmetry',
  },
  {
    id: 'wall_angel',
    name: 'Shoulder Overhead Flexion (Wall Angel)',
    targetRegion: 'shoulder',
    description: 'Tests shoulder overhead reach tied to thoracic extension.',
    instructions: [
      'Stand with heels, glutes, upper back, and head flat against wall.',
      'Bring arms to 90/90 position against wall.',
      'Slide arms overhead while keeping low back flat and wrists/elbows on wall.',
    ],
    metricType: 'qualitative',
  },
  {
    id: 'sleeper_check',
    name: 'Shoulder IR / Sleeper Check',
    targetRegion: 'shoulder',
    description: 'Monitors posterior capsule tightness and internal rotation symmetry.',
    instructions: [
      'Lie on side with bottom elbow at 90 degrees in front of shoulder.',
      'Gently rotate forearm down toward floor using light touch.',
      'Note distance to floor and compare left vs right throwing shoulder.',
    ],
    metricType: 'symmetry',
  },
  {
    id: 'thoracic_rotation',
    name: 'Thoracic Rotation Test',
    targetRegion: 'thoracic',
    description: 'Measures mid-back rotational range of motion.',
    instructions: [
      'Sit tall in chair with arms crossed over chest.',
      'Rotate upper body fully to left then right while keeping hips completely still.',
      'Compare rotational angle side-to-side using a mirror or video.',
    ],
    metricType: 'degrees',
  },
];
