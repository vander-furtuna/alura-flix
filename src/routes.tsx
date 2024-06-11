import { createBrowserRouter, Outlet } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewVideo } from './pages/NewVideo'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/novo-video',
        element: <NewVideo />,
      },
    ],
  },
])
