import { RouteObject } from 'react-router-dom'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { ReactNode } from 'react'

// Import pages
// We'll create these later, for now we'll use placeholder components
const Home = () => <Box sx={{ p: 3 }}>Home Page</Box>
const About = () => <Box sx={{ p: 3 }}>About Page</Box>
const NotFound = () => <Box sx={{ p: 3 }}>404 - Page Not Found</Box>

// Export routes for use with createBrowserRouter
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <App>
        <Home />
      </App>
    )
  },
  {
    path: "/about",
    element: (
      <App>
        <About />
      </App>
    )
  },
  {
    path: "*",
    element: (
      <App>
        <NotFound />
      </App>
    )
  }
];

// App component that wraps the content with theme and layout
function App({ children }: { children?: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

