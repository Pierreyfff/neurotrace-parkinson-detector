import React from 'react';
import type { ModuleType } from '../types/module';

interface ModuleSelectorProps {
  activeModule: ModuleType;
  onModuleChange: (module:  ModuleType) => void;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  activeModule,
  onModuleChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 inline-flex gap-2">
      <button
        onClick={() => onModuleChange('upload')}
        className={`
          px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${
            activeModule === 'upload'
              ? 'bg-primary text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Cargar Imagen</span>
        </div>
      </button>

      <button
        onClick={() => onModuleChange('draw')}
        className={`
          px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${
            activeModule === 'draw'
              ?  'bg-primary text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15. 232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>Dibuja Aquí</span>
        </div>
      </button>
    </div>
  );
};