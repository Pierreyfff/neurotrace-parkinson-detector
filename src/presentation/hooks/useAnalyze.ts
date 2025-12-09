import { useState, useEffect } from 'react';
import { analyzeDrawingUseCase } from '../../infrastructure/dependencies';

export const useAnalyze = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load model on mount
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      console.log('🧠 Initializing Deep Learning model...');
      await analyzeDrawingUseCase. deepLearningModel.loadModel();
      console.log('✅ Deep Learning model ready');
    } catch (err) {
      console.error('❌ Failed to load Deep Learning model:', err);
      setError('Failed to load AI model. Please refresh the page.');
    }
  };

  const handleImageSelect = async (file: File) => {
    try {
      setError(null);
      setResult(null);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        setImage(imageUrl);
        
        // Convert to HTMLImageElement for analysis
        const img = new Image();
        img.onload = async () => {
          try {
            setIsAnalyzing(true);
            const analysis = await analyzeDrawingUseCase.execute(img, imageUrl);
            setResult(analysis);
            setIsAnalyzing(false);
          } catch (err) {
            setError(err instanceof Error ? err. message :  'Analysis failed');
            setIsAnalyzing(false);
          }
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setIsAnalyzing(false);
    }
  };

  const handleDrawingSubmit = async (imageUrl: string) => {
    try {
      setError(null);
      setResult(null);
      setImage(imageUrl);
      
      // Convert base64 to HTMLImageElement
      const img = new Image();
      img.onload = async () => {
        try {
          setIsAnalyzing(true);
          const analysis = await analyzeDrawingUseCase.execute(img, imageUrl);
          setResult(analysis);
          setIsAnalyzing(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Analysis failed');
          setIsAnalyzing(false);
        }
      };
      img.src = imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return {
    image,
    result,
    isAnalyzing,
    error,
    handleImageSelect,
    handleDrawingSubmit,
    resetAnalysis,
  };
};