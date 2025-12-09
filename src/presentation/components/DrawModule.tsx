import React from 'react';
import { DrawingCanvas } from './DrawingCanvas';

interface DrawModuleProps {
  onDrawingSubmit: (imageData: string) => void;
  isAnalyzing: boolean;
}

export const DrawModule: React. FC<DrawModuleProps> = ({
  onDrawingSubmit,
  isAnalyzing,
}) => {
  return (
    <div className="space-y-8">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Instrucciones de dibujo
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Dibuja un Patrón</h4>
              <p className="text-sm text-blue-700">
                Dibuja un patrón de espiral o de onda en el lienzo a continuación
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Revisa tu Dibujo</h4>
              <p className="text-sm text-blue-700">
                Asegúrate de que tu dibujo esté claro y completo
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Analiza</h4>
              <p className="text-sm text-blue-700">
                Haz clic en "Analizar Dibujo" para obtener resultados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Dibuja un patrón
        </h3>
        <p className="text-gray-600 mb-6">
          Utilice el mouse o el tacto para dibujar un patrón en espiral o de ondas en el lienzo a continuación.
        </p>
        
        <DrawingCanvas
          onDrawingComplete={onDrawingSubmit}
          disabled={isAnalyzing}
        />

        {isAnalyzing && (
          <div className="mt-4 text-center text-primary font-medium">
            🔄 Analyzing your drawing...
          </div>
        )}
      </div>
    </div>
  );
};