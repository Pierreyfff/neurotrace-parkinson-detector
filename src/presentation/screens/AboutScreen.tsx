import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const AboutScreen:  React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md: text-5xl font-bold text-gray-900 mb-4">
            Acerca de NeuroTrace
          </h1>
          <p className="text-lg text-gray-600">
            Una herramienta experimental de IA para investigación en
            clasificación de patrones de signos tempranos de Parkinson
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Purpose */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Propósito</h2>
            <p className="text-gray-700 leading-relaxed">
              NeuroTrace es un proyecto de investigación experimental que
              utiliza aprendizaje profundo para clasificar patrones dibujados a
              mano, como espirales y ondas. El sistema categoriza los dibujos en
              patrones que podrían estar asociados con condiciones neurológicas
              o con niveles de referencia saludables.
            </p>
          </section>

          {/* How It Works */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>La plataforma ofrece tres modos de interacción:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-gray-900">Subir Imagen:</strong>{" "}
                  Analiza patrones previamente dibujados a partir de archivos de
                  imagen
                </li>
                <li>
                  <strong className="text-gray-900">Live: </strong> Clasificación
                  en tiempo real usando la cámara web
                </li>
                <li>
                  <strong className="text-gray-900">Dibuja aquí:</strong> Lienzo
                  interactivo para crear y analizar patrones de inmediato
                </li>
              </ul>
              <p>
                El modelo subyacente es una arquitectura MobileNetV2 afinada,
                entrenada con conjuntos de datos de dibujos etiquetados,
                logrando un 88,57% de precisión en pruebas para la clasificación
                de patrones de espirales y ondas.
              </p>
            </div>
          </section>

          {/* Important Limitations */}
          <section className="bg-red-50 rounded-xl border-2 border-red-200 p-8">
            <div className="flex items-start gap-3 mb-4">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h. 01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-. 77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h2 className="text-2xl font-bold text-red-900 mb-2">
                  Limitaciones Importantes
                </h2>
                <p className="text-red-800 font-medium mb-4">
                  NeuroTrace NO es un dispositivo médico, herramienta de
                  diagnóstico ni instrumento clínico, sino una herramienta
                  experimetal con proyección a futuro en colaboración con
                  expertos.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-red-900 ml-9">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  No utilice esta herramienta para diagnosticar o
                  autodiagnosticarse ninguna condición médica.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  Los resultados son experimentales y no han sido validados
                  clínicamente.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  El modelo puede producir falsos positivos o falsos negativos. 
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  Consulte siempre a profesionales de la salud calificados para
                  cualquier inquietud médica. 
                </span>
              </li>
            </ul>
          </section>

          {/* Future Vision */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Visión Futura
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              NeuroTrace está diseñado como una plataforma de investigación
              colaborativa con posibles aplicaciones en:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Investigación Clínica
                </h3>
                <p className="text-sm text-blue-800">
                  Apoyar a neurólogos e investigadores en estudios de análisis
                  de patrones a gran escala.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Detección Temprana
                </h3>
                <p className="text-sm text-blue-800">
                  Integración potencial en protocolos completos de detección
                  médica bajo supervisión experta.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Recopilación de Datos
                </h3>
                <p className="text-sm text-blue-800">
                  Contribuyendo a conjuntos de datos más grandes para mejorar
                  los modelos de IA en contextos de atención médica.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Herramienta educativa
                </h3>
                <p className="text-sm text-blue-800">
                  Demostración de las capacidades de la IA en imágenes médicas y
                  reconocimiento de patrones.
                </p>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tecnología utilizada
            </h2>
            <div className="grid md: grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>React + TypeScript</li>
                  <li>TailwindCSS</li>
                  <li>Canvas API</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Python Flask</li>
                  <li>REST API</li>
                  <li>Real-time inference</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Modelo de IA
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>TensorFlow/Keras</li>
                  <li>MobileNetV2</li>
                  <li>Transfer Learning</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Contact/Disclaimer Footer */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-center text-sm text-gray-500">
            NeuroTrace es un proyecto de investigación académica. Para preguntas
            o consultas de colaboración, comuníquese con el departamento de
            investigación de su institución.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};