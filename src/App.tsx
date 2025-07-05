import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'

// Import pages
// We'll create these later, for now we'll use placeholder components
const Home = () => <Box sx={{ p: 3 }}>Home Page</Box>
const About = () => <Box sx={{ p: 3 }}>About Page</Box>
const NotFound = () => <Box sx={{ p: 3 }}>404 - Page Not Found</Box>

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
