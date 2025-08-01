'use client';

import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import AnalysisReport from '../components/AnalysisReport';
import ChartDisplay from '../components/ChartDisplay';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Excel Analyzer</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Carga tu archivo Excel para análisis automático
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Sube un archivo Excel (.xlsx o .xls) para detectar automáticamente tipos de datos, 
                limpiar registros y generar visualizaciones dinámicas con Plotly.
              </p>
              
              <FileUploader 
                setIsLoading={setIsLoading} 
                setAnalysisResult={setAnalysisResult} 
                setError={setError} 
              />
            </div>

            {isLoading && (
              <div className="px-4 py-5 sm:p-6 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-700 dark:text-gray-300">Analizando datos...</p>
              </div>
            )}

            {error && (
              <div className="px-4 py-5 sm:p-6 bg-red-50 dark:bg-red-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error al procesar el archivo</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="px-4 py-5 sm:p-6">
                <AnalysisReport report={analysisResult.report} />
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Visualizaciones generadas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analysisResult.charts.map((chart, index) => (
                      <ChartDisplay key={index} chart={chart} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Excel Analyzer - Análisis automático de datos con Plotly y FastAPI
          </p>
        </div>
      </footer>
    </div>
  );
}
