import React from 'react';

export const Footer:  React.FC = () => {
  return (
    <footer className='bg-white border-t border-gray-200 mt-16'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Project Info */}
          <div>
            <h3 className='font-bold text-gray-900 mb-3'>NeuroTrace</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Proyecto de curso de Deep Learning enfocado en clasificación de patrones usando redes neuronales 
              convolucionales para investigación en detección de trastornos neurológicos. 
            </p>
          </div>

          {/* Technology */}
          <div>
            <h3 className='font-bold text-gray-900 mb-3'>Tecnología</h3>
            <ul className='text-sm text-gray-600 space-y-2'>
              <li>TensorFlow / Keras</li>
              <li>Arquitectura MobileNetV2</li>
              <li>React + TypeScript</li>
              <li>API Python Flask</li>
            </ul>
          </div>

          {/* Academic Context */}
          <div>
            <h3 className='font-bold text-gray-900 mb-3'>Proyecto Académico</h3>
            <p className='text-sm text-gray-600 leading-relaxed mb-3'>
              Desarrollado como parte del plan de estudios de un curso de Deep Learning, explorando aplicaciones 
              de visión por computadora en reconocimiento de patrones de salud.
            </p>
            <p className='text-xs text-gray-500 italic'>
              Solo para fines educativos y de investigación
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-200 mt-8 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-500'>
              Proyecto de Curso Deep Learning
            </p>
            <div className='flex gap-6 text-sm text-gray-500'>
              <a href='/about' className='hover:text-primary transition-colors'>
                Acerca de
              </a>
              <a href='/faq' className='hover:text-primary transition-colors'>
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};