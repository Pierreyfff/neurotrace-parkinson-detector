export interface Analysis {
  id: string;
  timestamp: Date;
  imageUrl: string;
  prediction: {
    class: 'other' | 'spiral_healthy' | 'spiral_parkinson' | 'wave_healthy' | 'wave_parkinson';
    confidence: number;
    probabilities: {
      other: number;
      spiral_healthy: number;
      spiral_parkinson: number;
      wave_healthy: number;
      wave_parkinson: number;
    };
  };
}