import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { VideosProvider } from './contexts/video'
import { routes } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VideosProvider>
      <RouterProvider router={routes} />
    </VideosProvider>
  </React.StrictMode>,
)
