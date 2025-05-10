// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExternalRedirect from './components/ExternalRedirect';
import LandingSimplified from './pages/LandingSimplified';
import NotFound from './components/404';

function App() {
  return (
    <Router basename="/0xD3C0D3-site">
      <Routes>
      
        <Route path="/" element={<LandingSimplified />} />

        
        <Route 
          path="/join" 
          element={<ExternalRedirect 
                    to="https://discord.gg/B6sdc2yDEP" 
                    message="Redirigiendo a nuestro Discord..." 
                  />} 
        />


        {/* Ruta 404 */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
