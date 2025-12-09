import React from 'react';
import { Header } from '../components/Header';
import { FAQItem } from '../components/FAQItem';

export const FAQScreen: React.FC = () => {
  const faqs = [
    {
      question: '¿Qué es NeuroTrace?',
      answer: 
        'NeuroTrace es una plataforma experimental impulsada por IA que clasifica patrones dibujados a mano (espirales y ondas) en categorías como saludables, relacionadas con Parkinson u otras. Es una herramienta de investigación, no un dispositivo de diagnóstico médico.',
    },
    {
      question: '¿Puedo usar NeuroTrace para diagnosticar la enfermedad de Parkinson?',
      answer:
        'No. NeuroTrace NO es una herramienta de diagnóstico y no ha sido validada clínicamente. Es un proyecto de investigación experimental. Siempre consulte a profesionales de la salud calificados para diagnóstico y tratamiento médico.',
    },
    {
      question: '¿Qué tan preciso es el modelo de IA?',
      answer: 
        'El modelo subyacente alcanzó un 88.57% de precisión en pruebas sobre nuestro conjunto de datos etiquetado. Sin embargo, la precisión en el mundo real puede variar. Son posibles falsos positivos y falsos negativos. Los resultados nunca deben usarse como única base para decisiones médicas.',
    },
    {
      question: '¿Qué modos de análisis están disponibles?',
      answer: 
        'NeuroTrace ofrece tres modos: (1) Subir Imagen - analiza fotos de dibujos existentes, (2) Cámara en Vivo - clasificación en tiempo real mediante webcam, y (3) Dibujar Aquí - lienzo interactivo para crear y analizar patrones de inmediato.',
    },
    {
      question: '¿Se almacenan o comparten mis datos?',
      answer:
        'Las imágenes procesadas por NeuroTrace se envían a un servidor local para su análisis. Ningún dato se almacena de forma permanente ni se comparte con terceros en la implementación actual. Sin embargo, siempre revise las políticas de privacidad si usa versiones alojadas.',
    },
    {
      question: '¿Quién debería usar NeuroTrace?',
      answer:
        'NeuroTrace está destinado a investigadores, educadores y entusiastas de la IA que exploran el reconocimiento de patrones en contextos de salud. Puede apoyar flujos de investigación clínica futura bajo supervisión experta, pero no es para uso de pacientes sin supervisión.',
    },
    {
      question: '¿Qué tecnología impulsa NeuroTrace?',
      answer:
        'La plataforma utiliza un frontend en React + TypeScript con TailwindCSS, un backend en Python Flask y un modelo MobileNetV2 de TensorFlow/Keras ajustado con datasets de dibujos de espirales y ondas.',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      <main className='max-w-4xl mx-auto px-6 py-12'>
        {/* Hero */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Preguntas frecuentes
          </h1>
          <p className='text-lg text-gray-600'>Preguntas frecuentes sobre NeuroTrace y sus capacidades</p>
        </div>

        {/* FAQ List */}
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Additional Help */}
        <div className='mt-12 bg-blue-50 rounded-xl border border-blue-200 p-6'>
          <h2 className='text-xl font-semibold text-blue-900 mb-2'>Aún tienes preguntas?</h2>
          <p className='text-blue-800 mb-4'>
            Si tu pregunta no se responde aquí, consulta la sección Acerca de para obtener más detalles sobre
            el propósito y las limitaciones del proyecto.
          </p>
          <a
            href='/about'
            className='inline-block px-6 py-2 bg-primary text-white rounded-lg hover: bg-primary-dark transition-colors font-medium'
          >
            Lee más sobre NeuroTrace
          </a>
        </div>

        {/* Disclaimer */}
        <div className='mt-8 pt-8 border-t border-gray-300'>
          <p className='text-center text-sm text-gray-500'>
            NeuroTrace es solo para fines de investigación y educativos. No sustituye el uso clínico.
          </p>
        </div>
      </main>
    </div>
  );
};