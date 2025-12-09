import { create } from 'zustand';
import type { Analysis } from '../../domain/entities/Analysis';

interface AnalysisState {
  // Estado
  currentAnalysis: Analysis | null;
  isAnalyzing: boolean;
  error: string | null;
  uploadedImage: string | null;

  // Acciones
  setUploadedImage: (imageUrl: string) => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
  setCurrentAnalysis: (analysis: Analysis) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  // Estado inicial
  currentAnalysis: null,
  isAnalyzing: false,
  error: null,
  uploadedImage: null,

  // Acciones
  setUploadedImage: (imageUrl) => set({ uploadedImage: imageUrl, error: null }),
  
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  
  setCurrentAnalysis: (analysis) =>
    set({
      currentAnalysis: analysis,
      isAnalyzing: false,
      error: null,
    }),
  
  setError: (error) =>
    set({
      error,
      isAnalyzing: false,
    }),
  
  reset: () =>
    set({
      currentAnalysis: null,
      isAnalyzing: false,
      error: null,
      uploadedImage: null,
    }),
}));