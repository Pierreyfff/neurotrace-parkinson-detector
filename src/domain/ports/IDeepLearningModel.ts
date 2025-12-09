import type { Analysis } from '../entities/Analysis';

export interface IDeepLearningModel {
  /**
   * Carga el modelo de Deep Learning (TensorFlow.js)
   */
  loadModel(): Promise<void>;

  /**
   * Realiza predicción usando el modelo de Deep Learning
   * @param imageData - Imagen en formato ImageData o HTMLImageElement
   * @returns Análisis con predicción del modelo
   */
  predict(imageData: ImageData | HTMLImageElement): Promise<Analysis['prediction']>;

  /**
   * Verifica si el modelo está cargado
   */
  isModelLoaded(): boolean;
}