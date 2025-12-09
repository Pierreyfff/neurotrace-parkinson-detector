import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export function ImagePreview({ imageUrl, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
      <img
        src={imageUrl}
        alt="Uploaded drawing"
        className="w-full h-full object-contain"
      />

      <button
        onClick={onRemove}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Remove image"
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}