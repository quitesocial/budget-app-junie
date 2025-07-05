import { ReactNode } from 'react'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'

// Layout component that wraps the content with theme and layout
function Layout({ children }: { children?: ReactNode }) {
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

export default Layout
