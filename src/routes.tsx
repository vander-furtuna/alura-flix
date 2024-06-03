import { createBrowserRouter, Outlet } from 'react-router-dom'

import { Home } from './pages/Home'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])
