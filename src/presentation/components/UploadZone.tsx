import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { validateImageFile } from '../../shared/utils/imageProcessor';
import { Button } from './ui/Button';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileSelect, disabled = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (! disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    const validation = validateImageFile(file);
    if (! validation.valid) {
      setError(validation.error || 'Archivo inválido');
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    if (! disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Subir Imagen</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-xl p-12
          transition-all duration-200 cursor-pointer
          ${isDragging
            ? 'border-primary bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }
          ${disabled ?  'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center gap-4">
          <Upload className="w-16 h-16 text-gray-400" strokeWidth={1.5} />

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Arrastra y suelta tu imagen aquí
            </p>
            <p className="text-sm text-gray-600">
              Tipos de archivo aceptados: JPG, PNG
            </p>
          </div>

          <Button variant="primary" disabled={disabled}>
            Subir Dibujo
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
