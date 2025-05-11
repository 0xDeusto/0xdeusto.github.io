// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExternalRedirect from './components/ExternalRedirect';
import LandingSimplified from './pages/LandingSimplified';
import NotFound from './components/404';

function App() {
  return (
    <Router basename='/'>
      <Routes>
      
        <Route path="/" element={<LandingSimplified />} />

        {/* Ruta 404 */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
