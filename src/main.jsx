import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { router } from './Routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>

    <ToastContainer />

  </StrictMode>,
)
