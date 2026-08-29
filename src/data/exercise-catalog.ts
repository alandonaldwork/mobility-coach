import { Exercise } from '../types';
import { STRETCH_LIBRARY } from './stretches-library';
import { MOBILITY_LIBRARY } from './mobility-library';

export const UNIFIED_LIBRARY: Exercise[] = [
  ...STRETCH_LIBRARY.map((exercise) => ({ ...exercise, libraryTag: 'stretch' as const })),
  ...MOBILITY_LIBRARY.map((exercise) => ({ ...exercise, libraryTag: 'mobility' as const })),
];

export const getExerciseById = (id: number): Exercise | undefined =>
  UNIFIED_LIBRARY.find((exercise) => exercise.id === id);
