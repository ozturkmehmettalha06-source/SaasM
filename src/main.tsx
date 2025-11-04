import './styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="min-h-screen grid place-items-center">Yükleniyor...</div>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </BrowserRouter>
);
