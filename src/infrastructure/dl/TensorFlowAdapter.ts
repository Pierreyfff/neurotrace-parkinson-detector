import type { IDeepLearningModel } from '../../domain/ports/IDeepLearningModel';
import type { Analysis } from '../../domain/entities/Analysis';

export class TensorFlowAdapter implements IDeepLearningModel {
  private readonly API_URL = import.meta.env.VITE_API_URL || 'https://neurotrace-parkinson-detector-1.onrender.com';
  private modelLoaded = false;

  async loadModel(): Promise<void> {
    try {
      console. log('🔄 Connecting to Deep Learning backend...');
      
      const response = await fetch(`${this.API_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }
      
      const data = await response. json();
      
      if (data.status === 'ok' && data.model === 'loaded') {
        this.modelLoaded = true;
        console. log('✅ Deep Learning backend connected');
        console.log(`   Status: ${data.status}`);
        console.log(`   Model: ${data.model}`);
        console.log(`   Version: ${data.version}`);
      } else {
        throw new Error('Backend not ready');
      }
    } catch (error) {
      console.error('❌ Error connecting to backend:', error);
      console.error('   Make sure Python backend is running on port 5000');
      throw new Error('Failed to connect to Deep Learning backend');
    }
  }

  async predict(imageData:  ImageData | HTMLImageElement): Promise<Analysis['prediction']> {
    if (!this.modelLoaded) {
      throw new Error('Backend not connected. Call loadModel() first.');
    }

    try {
      // Convertir imagen a base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }
      
      if (imageData instanceof ImageData) {
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
      } else {
        canvas. width = imageData.width;
        canvas.height = imageData. height;
        ctx.drawImage(imageData, 0, 0);
      }
      
      const base64Image = canvas. toDataURL('image/png');
      
      console.log('🔄 Sending image to backend for prediction...');
      
      // Enviar al backend
      const response = await fetch(`${this.API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: base64Image })
      });
      
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result. error || 'Prediction failed');
      }
      
      console.log(`✅ Prediction:  ${result.prediction.class} (${(result.prediction.confidence * 100).toFixed(2)}%)`);
      
      return result.prediction;
    } catch (error) {
      console.error('❌ Error during prediction:', error);
      throw new Error('Prediction failed');
    }
  }

  isModelLoaded(): boolean {
    return this.modelLoaded;
  }
}