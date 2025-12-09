import type { Analysis } from '../../domain/entities/Analysis';
import { CLASS_LABELS, CLASS_DESCRIPTIONS } from '../../shared/constants/classes';
import { formatPercentage, getConfidenceLevel } from '../../shared/utils/formatters';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface ResultCardProps {
  analysis: Analysis;
  onNewAnalysis: () => void;
}

export function ResultCard({ analysis, onNewAnalysis }: ResultCardProps) {
  const { prediction } = analysis;
  const confidenceLevel = getConfidenceLevel(prediction.confidence);

  // Determinar color y icono según la clase
  const getClassColor = () => {
    if (prediction.class === 'other') return 'text-gray-700';
    if (prediction.class. includes('parkinson')) return 'text-red-600';
    return 'text-green-600';
  };

  const getIcon = () => {
    if (prediction.class === 'other') return XCircle;
    if (prediction.class.includes('parkinson')) return AlertTriangle;
    return CheckCircle;
  };

  const Icon = getIcon();

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mb-2">Análisis Completo</p>
        <h2 className="text-2xl font-bold text-gray-900">Resultado del Análisis</h2>
      </div>

      {/* Confidence Score */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <Icon className={`w-12 h-12 ${getClassColor()} flex-shrink-0`} />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Puntaje de Confianza
            </h3>
            <p className={`text-5xl font-bold mb-2 ${getClassColor()}`}>
              {formatPercentage(prediction.confidence)}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Detectado: </span>
              {CLASS_LABELS[prediction.class]}
            </p>
            <p className="text-sm text-gray-600">
              {CLASS_DESCRIPTIONS[prediction.class]}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold">Nivel de Confianza: </span> {confidenceLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Probabilities */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Probabilidades Detalladas:
        </h4>
        <div className="space-y-2">
          {Object.entries(prediction.probabilities).map(([className, prob]) => (
            <div key={className} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-36">
                {CLASS_LABELS[className as keyof typeof CLASS_LABELS]}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${prob * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 w-16 text-right">
                {formatPercentage(prob)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Aviso:</span> Esta es una herramienta de detección, no un diagnóstico. 
          Por favor, consulte a un profesional médico para una evaluación precisa.
        </p>
      </div>

      {/* New Analysis Button */}
      <Button
        variant="primary"
        onClick={onNewAnalysis}
        className="w-full"
      >
        Iniciar Nuevo Análisis
      </Button>
    </div>
  );
}