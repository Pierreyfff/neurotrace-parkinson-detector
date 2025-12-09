import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { SubModuleSelector } from './SubModuleSelector';
import { StreamAnalysis } from './StreamAnalysis';
import type { UploadSubModuleType } from '../types/uploadSubModule';
import type { Analysis } from '../../domain/entities/Analysis';

interface UploadModuleProps {
  onImageUpload: (file: File) => void;
  onStreamPrediction?:  (prediction: Analysis['prediction']) => void;
  isAnalyzing: boolean;
}

export const UploadModule: React.FC<UploadModuleProps> = ({
  onImageUpload,
  onStreamPrediction,
  isAnalyzing,
}) => {
  const [activeSubModule, setActiveSubModule] = useState<UploadSubModuleType>('static');

  const handleSubModuleChange = (subModule: UploadSubModuleType) => {
    setActiveSubModule(subModule);
  };

  return (
    <div className='space-y-8'>
      {/* Selector de Sub-módulo */}
      <div className='flex justify-center'>
        <SubModuleSelector
          activeSubModule={activeSubModule}
          onSubModuleChange={handleSubModuleChange}
        />
      </div>

      {/* Instrucciones */}
      <div className='bg-green-50 border border-green-200 rounded-xl p-6'>
        <h3 className='text-lg font-semibold text-green-900 mb-4'>
          {activeSubModule === 'static' ?  'Instrucciones para Subir Imagen' : 'Instrucciones para Cámara en Vivo'}
        </h3>
        <div className='grid md:grid-cols-3 gap-4'>
          {activeSubModule === 'static' ? (
            <>
              <div className='flex gap-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                  1
                </div>
                <div>
                  <h4 className='font-medium text-green-900'>Preparar Imagen</h4>
                  <p className='text-sm text-green-700'>
                    Toma una foto clara de un dibujo de espiral o onda sobre un fondo liso
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                  2
                </div>
                <div>
                  <h4 className='font-medium text-green-900'>Subir Imagen</h4>
                  <p className='text-sm text-green-700'>
                    Haz clic o arrastra tu archivo de imagen a la zona de subida
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                  3
                </div>
                <div>
                  <h4 className='font-medium text-green-900'>Obtener Resultados</h4>
                  <p className='text-sm text-green-700'>
                    El análisis comenzará automáticamente después de subir la imagen
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex gap-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                  1
                </div>
                <div>
                  <h4 className='font-medium text-green-900'>Iniciar Cámara</h4>
                  <p className='text-sm text-green-700'>
                    Haz clic en "Iniciar Cámara" y permite el acceso a la cámara
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                  2
                </div>
                <div>
                  <h4 className='font-medium text-green-900'>Mostrar Dibujo</h4>
                  <p className='text-sm text-green-700'>
                    Sostén tu dibujo de espiral u onda frente a la cámara
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold'>
                  3
                </div>
                <div>
                  <h4 className='font-medium text-green-900'>Análisis en Tiempo Real</h4>
                  <p className='text-sm text-green-700'>
                    Visualiza predicciones y probabilidades en vivo para cada categoría
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Contenido */}
      {activeSubModule === 'static' ? (
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-8'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>Sube tu Imagen de Dibujo</h3>
          <p className='text-gray-600 mb-6'>Formatos soportados: JPG, PNG, WEBP (máx 10MB)</p>

          <UploadZone onFileSelect={onImageUpload} disabled={isAnalyzing} />

          {isAnalyzing && (
            <div className='mt-4 text-center text-primary font-medium'>Analizando tu imagen...</div>
          )}
        </div>
      ) : (
        <StreamAnalysis
          onPrediction={onStreamPrediction || (() => {})}
          isAnalyzing={isAnalyzing}
        />
      )}
    </div>
  );
};
