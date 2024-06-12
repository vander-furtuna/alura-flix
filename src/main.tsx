import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { VideosProvider } from './contexts/video'
import { routes } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VideosProvider>
      <Toaster richColors />
      <RouterProvider router={routes} />
    </VideosProvider>
  </React.StrictMode>,
)
