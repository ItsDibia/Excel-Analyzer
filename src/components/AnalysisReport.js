'use client';

const AnalysisReport = ({ report }) => {
  const { rows_before, rows_after, cleaning_summary } = report;
  const { missing_values, invalid_types, duplicates_removed } = cleaning_summary;
  
  // Calcular porcentaje de filas eliminadas
  const removedPercentage = rows_before > 0 
    ? Math.round(((rows_before - rows_after) / rows_before) * 100) 
    : 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Informe de limpieza de datos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Registros originales</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{rows_before}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Registros después de limpieza</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{rows_after}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Registros eliminados</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {rows_before - rows_after} ({removedPercentage}%)
          </p>
        </div>
      </div>
      
      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Detalle de limpieza</h4>
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Tipo de limpieza</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Cantidad</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Porcentaje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">Valores nulos</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{missing_values}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {rows_before > 0 ? Math.round((missing_values / rows_before) * 100) : 0}%
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">Tipos inválidos</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{invalid_types}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {rows_before > 0 ? Math.round((invalid_types / rows_before) * 100) : 0}%
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">Duplicados</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{duplicates_removed}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {rows_before > 0 ? Math.round((duplicates_removed / rows_before) * 100) : 0}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisReport;