export type ClassType = 'other' | 'spiral_healthy' | 'spiral_parkinson' | 'wave_healthy' | 'wave_parkinson';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface PredictionResult {
  class: ClassType;
  confidence: number;
  probabilities: Record<ClassType, number>;
}