import { TensorFlowAdapter } from './dl/TensorFlowAdapter';
import { AnalyzeDrawing } from '../domain/usecases/AnalyzeDrawing';

// ============= ADAPTADORES =============
const deepLearningModel = new TensorFlowAdapter();

// ============= CASOS DE USO =============
export const analyzeDrawingUseCase = new AnalyzeDrawing(deepLearningModel);