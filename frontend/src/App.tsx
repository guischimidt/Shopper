import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UploadPage from './pages/Upload/UploadPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<UploadPage />} />
      </Routes>
    </Router>
  )
}

export default App
