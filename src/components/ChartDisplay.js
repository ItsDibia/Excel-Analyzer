'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar Plotly dinámicamente para evitar problemas de SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const ChartDisplay = ({ chart }) => {
  const [plotData, setPlotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detectar modo oscuro
  useEffect(() => {
    // Verificar si está en modo oscuro al cargar
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Opcional: escuchar cambios en el modo oscuro
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (chart && chart.plotly_json) {
      try {
        // Parsear el JSON de Plotly
        const plotlyData = JSON.parse(JSON.stringify(chart.plotly_json));
        
        // Mejorar la visualización de las líneas en gráficos de tipo 'line'
        if (chart.type === 'line' && plotlyData.data) {
          // Determinar si es un gráfico temporal (tiene fechas en el eje X)
          const hasDates = plotlyData.data.some(trace => 
            trace.x && trace.x.length > 0 && 
            (typeof trace.x[0] === 'string' && trace.x[0].match(/\d{4}-\d{2}-\d{2}/))
          );
          
          // Para gráficos temporales, convertir a un gráfico de barras o área
          if (hasDates) {
            plotlyData.data = plotlyData.data.map((trace, index) => {
              // Alternar entre gráficos de barras y área para diferentes series
              if (index % 2 === 0) {
                return {
                  ...trace,
                  type: 'bar',
                  marker: {
                    color: trace.line?.color || '#3b82f6',
                    opacity: 0.8,
                    line: {
                      width: 1,
                      color: '#FFFFFF'
                    }
                  },
                  width: 0.7 // Ancho de las barras
                };
              } else {
                return {
                  ...trace,
                  type: 'scatter',
                  fill: 'tozeroy',
                  fillcolor: trace.line?.color ? `${trace.line.color}50` : 'rgba(59, 130, 246, 0.3)',
                  line: {
                    ...trace.line,
                    width: 3,
                    shape: 'spline',
                    smoothing: 1.3
                  },
                  marker: {
                    ...trace.marker,
                    size: 8
                  }
                };
              }
            });
          } else {
            // Para gráficos de línea no temporales, mejorar la visualización
            plotlyData.data = plotlyData.data.map(trace => ({
              ...trace,
              line: {
                ...trace.line,
                width: 3,
                color: trace.line?.color || undefined,
                shape: 'spline',
                smoothing: 1.3
              },
              marker: {
                ...trace.marker,
                size: 8
              }
            }));
          }
        }
        
        setPlotData(plotlyData);
      } catch (error) {
        console.error('Error al parsear el gráfico:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [chart]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-center h-80">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!plotData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400">No se pudo cargar el gráfico</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-md font-medium text-gray-900 dark:text-white">{chart.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tipo: {chart.type}</p>
      </div>
      <div className="p-2">
        <Plot
          data={plotData.data || []}
          layout={{
            ...plotData.layout,
            autosize: true,
            margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: {
              color: isDarkMode ? '#FFFFFF' : '#374151',
              size: 14
            },
            xaxis: {
              title: {
                font: {
                  color: '#FFFFFF',
                  size: 16
                }
              },
              tickfont: {
                color: '#FFFFFF',
                size: 14
              },
              gridcolor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
              linecolor: '#FFFFFF',
              linewidth: 2,
              showgrid: true,
              zeroline: false,
              // Mejorar formato de fechas si es un gráfico temporal
              tickformat: chart.type === 'line' ? '%b %Y' : undefined,
              tickangle: chart.type === 'line' ? 30 : 0
            },
            yaxis: {
              title: {
                font: {
                  color: '#FFFFFF',
                  size: 16
                }
              },
              tickfont: {
                color: '#FFFFFF',
                size: 14
              },
              gridcolor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
              linecolor: '#FFFFFF',
              linewidth: 2,
              showgrid: true,
              zeroline: false
            },
            colorway: [
              '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
              '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#06b6d4'
            ],
            legend: {
              font: {
                color: '#FFFFFF',
                size: 13
              },
              bgcolor: 'rgba(0,0,0,0)',
              bordercolor: '#FFFFFF',
              borderwidth: 1
            },
            height: 400,
            hovermode: 'closest',
            hoverlabel: {
              bgcolor: '#1F2937',
              bordercolor: '#FFFFFF',
              font: {
                color: '#FFFFFF',
                size: 14
              }
            }
          }}
          config={{
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: [
              'sendDataToCloud',
              'autoScale2d',
              'resetScale2d',
              'hoverClosestCartesian',
              'hoverCompareCartesian',
              'select2d',
              'lasso2d'
            ]
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default ChartDisplay;