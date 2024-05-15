import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routers/Routers';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
<link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className=" mx-auto">
            <RouterProvider router={router} />
          </div>
          <ToastContainer />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>


  </React.StrictMode>,
)

// max-w-screen-xl mx-auto