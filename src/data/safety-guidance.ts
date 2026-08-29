export interface SafetyGuideline {
  title: string;
  category: 'effort' | 'warning' | 'contraindication' | 'disclaimer';
  description: string;
}

export const SAFETY_GUIDANCE: SafetyGuideline[] = [
  {
    title: 'Effort Level Ceiling (4–6 / 10)',
    category: 'effort',
    description: 'Mobility work should sit at a comfortable 4–6 out of 10 effort range. Controlled tension is expected; intense strain or muscle guarding invalidates the exercise.',
  },
  {
    title: 'Red-Flag Warning Signals',
    category: 'warning',
    description: 'Mild-to-moderate stretching tension is normal. Sharp, localized, radiating, numb, or tingling sensations require immediate termination of the exercise.',
  },
  {
    title: 'Sleeper Stretch Specific Caution',
    category: 'warning',
    description: 'The Sleeper Stretch applies torque to the posterior shoulder capsule. Use minimal pressure. Immediately stop if any front-shoulder pinching occurs, and skip if active shoulder pain is present.',
  },
  {
    title: 'Avoid Stretching Inflamed / Acutely Injured Joints',
    category: 'contraindication',
    description: 'Do not push mobility range on acutely swollen joints, recent muscle strains, or sprains without clinical clearance from a physical therapist or sports physician.',
  },
  {
    title: 'Educational Guidance Disclaimer',
    category: 'disclaimer',
    description: 'This application provides general athletic educational guidance based on the Elite sport Daily Mobility & Stretching Program. It is not medical advice or a substitute for individualized physical therapy assessment.',
  },
];
