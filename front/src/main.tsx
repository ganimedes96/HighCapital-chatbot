import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ou App.tsx se você renomeou
import './index.css';

// Importe seu novo QueryProvider
import QueryProvider from './providers/query-provider'; // Ajuste o caminho conforme sua estrutura
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Ferramentas de desenvolvimento


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider> {/* Use seu provider personalizado */}
      <App />
      {/* Opcional: Adicione as ferramentas de desenvolvimento do TanStack Query */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
     {/* <Toaster /> */}
  </React.StrictMode>,
);