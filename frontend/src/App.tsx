import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, Container, createTheme, CssBaseline, Box } from '@mui/material';

import UploadPage from './pages/UploadPage';
import Header from './components/Header';
import Footer from './components/Footer';

const theme = createTheme();

function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh" justifyContent="space-between">
          <Header />
          <Container sx={{ minHeight: "80vh" }}>
            <Routes>
              <Route path='/' element={<UploadPage />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
