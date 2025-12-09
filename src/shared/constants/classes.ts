export const CLASS_NAMES = {
  other: 'other',
  spiral_healthy: 'spiral_healthy',
  spiral_parkinson: 'spiral_parkinson',
  wave_healthy: 'wave_healthy',
  wave_parkinson: 'wave_parkinson',
} as const;

export const CLASS_LABELS = {
  other: 'Invalid Image',
  spiral_healthy: 'Healthy Spiral',
  spiral_parkinson: 'Parkinson Spiral',
  wave_healthy: 'Healthy Wave',
  wave_parkinson: 'Parkinson Wave',
} as const;

export const CLASS_DESCRIPTIONS = {
  other: 'La imagen no corresponde a un dibujo de espiral o de onda.',
  spiral_healthy: 'El patrón de espiral sugiere un funcionamiento motor normal.',
  spiral_parkinson: 'El patrón de espiral muestra características asociadas con la enfermedad de Parkinson.',
  wave_healthy: 'El patrón de onda sugiere un funcionamiento motor normal.',
  wave_parkinson: 'El patrón de onda muestra características asociadas con la enfermedad de Parkinson.',
} as const;