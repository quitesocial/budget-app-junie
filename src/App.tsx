import { RouteObject } from 'react-router-dom'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

// Export routes for use with createBrowserRouter
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    )
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    )
  }
];
