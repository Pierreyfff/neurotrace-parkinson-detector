import type { Analysis } from '../entities/Analysis';
import type { IDeepLearningModel } from '../ports/IDeepLearningModel';

export class AnalyzeDrawing {
  public deepLearningModel: IDeepLearningModel;

  constructor(deepLearningModel:  IDeepLearningModel) {
    this.deepLearningModel = deepLearningModel;
  }

  async execute(imageData: ImageData | HTMLImageElement, imageUrl: string): Promise<Analysis> {
    // 1. Verificar que el modelo DL esté cargado
    if (! this.deepLearningModel. isModelLoaded()) {
      await this.deepLearningModel.loadModel();
    }

    // 2. Realizar predicción con Deep Learning
    const prediction = await this.deepLearningModel.predict(imageData);

    // 3. Crear análisis
    const analysis: Analysis = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      imageUrl,
      prediction,
    };

    return analysis;
  }
}