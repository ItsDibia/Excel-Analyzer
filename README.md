# Excel Analyzer Frontend

Interfaz de usuario en Next.js para cargar archivos Excel, procesarlos mediante la API de FastAPI y visualizar los resultados con Plotly.

## Características

- Carga de archivos Excel mediante arrastrar y soltar o selección de archivo
- Visualización de informes de limpieza de datos
- Gráficos interactivos generados automáticamente según los tipos de datos
- Interfaz responsiva y adaptable a dispositivos móviles
- Soporte para modo oscuro

## Requisitos

- Node.js 18.0.0 o superior
- npm o yarn

## Instalación y uso

1. Instalar dependencias:

```bash
npm install
# o
yarn install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

4. Asegúrate de que el backend (FastAPI) esté en ejecución en `http://localhost:8000`

5. Arrastra y suelta un archivo Excel o haz clic para seleccionarlo

6. Visualiza el informe de limpieza y los gráficos generados

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar [Geist](https://vercel.com/font), una nueva familia de fuentes para Vercel.

## Estructura del proyecto

- `src/app/page.js`: Página principal de la aplicación
- `src/components/FileUploader.js`: Componente para cargar archivos
- `src/components/AnalysisReport.js`: Componente para mostrar el informe de limpieza
- `src/components/ChartDisplay.js`: Componente para visualizar gráficos de Plotly

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/docs): Framework de React para aplicaciones web
- [Tailwind CSS](https://tailwindcss.com/): Framework de CSS para diseño responsivo
- [Axios](https://axios-http.com/): Cliente HTTP para realizar peticiones al backend
- [React Dropzone](https://react-dropzone.js.org/): Biblioteca para carga de archivos mediante arrastrar y soltar
- [Plotly.js](https://plotly.com/javascript/): Biblioteca para visualización de datos
- [React Icons](https://react-icons.github.io/react-icons/): Iconos para la interfaz de usuario

## Integración con el backend

Este frontend se comunica con una API desarrollada en FastAPI que se encarga de:

1. Recibir archivos Excel
2. Procesar y limpiar los datos
3. Detectar automáticamente los tipos de datos
4. Generar visualizaciones apropiadas con Plotly
5. Devolver un informe detallado y los gráficos generados

Asegúrate de que el backend esté en funcionamiento antes de utilizar esta aplicación.
