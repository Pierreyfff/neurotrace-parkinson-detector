import { Brain, Pen } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Brain className="w-10 h-10 text-primary" strokeWidth={1.5} />
        <Pen className="w-4 h-4 text-primary absolute -bottom-1 -right-1" strokeWidth={2} />
      </div>
      <span className="text-xl font-semibold text-gray-900">
        NeuroTrace
      </span>
    </div>
  );
}