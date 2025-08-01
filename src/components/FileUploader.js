'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FiUpload, FiFile } from 'react-icons/fi';

const FileUploader = ({ setIsLoading, setAnalysisResult, setError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const onDrop = useCallback(async (acceptedFiles) => {
    // Verificar que hay archivos
    if (acceptedFiles.length === 0) {
      setError('No se seleccionó ningún archivo');
      return;
    }

    const file = acceptedFiles[0];
    setSelectedFile(file);

    // Verificar que es un archivo Excel
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('El archivo debe ser un Excel (.xlsx o .xls)');
      return;
    }

    // Crear FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);

      // Enviar archivo al backend
      const response = await axios.post('https://excel-analyzer-api.onrender.com/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Procesar respuesta
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error al analizar el archivo:', error);
      setError(
        error.response?.data?.detail ||
        'Error al procesar el archivo. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setAnalysisResult, setError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : selectedFile 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          {isDragActive ? (
            <FiUpload className="h-12 w-12 text-blue-500" />
          ) : selectedFile ? (
            <FiFile className="h-12 w-12 text-green-500" />
          ) : (
            <FiFile className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          )}
          <div className="space-y-1 text-center">
            {selectedFile ? (
              <>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Archivo seleccionado: {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? 'Suelta el archivo aquí...'
                    : 'Arrastra y suelta un archivo Excel aquí'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Formatos soportados: .xlsx, .xls (máximo 10MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Botón explícito para seleccionar archivo */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Seleccionar archivo desde el escritorio
        </button>
        
        {selectedFile && (
          <button
            onClick={() => {
              const formData = new FormData();
              formData.append('file', selectedFile);
              setIsLoading(true);
              setError(null);
              setAnalysisResult(null);
              
              axios.post('https://excel-analyzer-api.onrender.com/analyze', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(response => {
                setAnalysisResult(response.data);
              })
              .catch(error => {
                console.error('Error al analizar el archivo:', error);
                setError(
                  error.response?.data?.detail ||
                  'Error al procesar el archivo. Por favor, inténtalo de nuevo.'
                );
              })
              .finally(() => {
                setIsLoading(false);
              });
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Analizar archivo
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;