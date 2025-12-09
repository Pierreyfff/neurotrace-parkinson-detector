import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ModuleSelector } from "../components/ModuleSelector";
import { UploadModule } from "../components/UploadModule";
import { DrawModule } from "../components/DrawModule";
import { ImagePreview } from "../components/ImagePreview";
import { ResultCard } from "../components/ResultCard";
import { useAnalyze } from "../hooks/useAnalyze";
import type { ModuleType } from "../types/module";

export const HomeScreen: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>("upload");
  const {
    image,
    result,
    isAnalyzing,
    error,
    handleImageSelect,
    handleDrawingSubmit,
    resetAnalysis,
  } = useAnalyze();

  const handleModuleChange = (module: ModuleType) => {
    setActiveModule(module);
    resetAnalysis();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analiza tu dibujo en busca de indicios tempranos de Parkinson
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sube una imagen clara de un dibujo en espiral o de ondas sobre un
            fondo liso. Esta herramienta utiliza un modelo de aprendizaje
            profundo para analizar características asociadas con la enfermedad
            de Parkinson.
          </p>
        </div>

        {/* Module Selector */}
        <div className="flex justify-center mb-8">
          <ModuleSelector
            activeModule={activeModule}
            onModuleChange={handleModuleChange}
          />
        </div>

        {/* Module Content */}
        <div className="mb-12">
          {activeModule === "upload" ? (
            <UploadModule
              onImageUpload={handleImageSelect}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <DrawModule
              onDrawingSubmit={handleDrawingSubmit}
              isAnalyzing={isAnalyzing}
            />
          )}
        </div>

        {/* Preview and Results */}
        {image && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ImagePreview imageUrl={image} onRemove={() => resetAnalysis()} />
            {result && (
              <ResultCard analysis={result} onNewAnalysis={resetAnalysis} />
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-12 p-6 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};