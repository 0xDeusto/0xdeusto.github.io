// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExternalRedirect from './components/common/ExternalRedirect';
import EventsPage from './pages/EventsPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router basename="/0xD3C0D3-site">
      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path='/contact' element={<ContactPage/>} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path='/about' element={<AboutPage />} />
        
        <Route 
          path="/join" 
          element={<ExternalRedirect 
                    to="https://discord.gg/B6sdc2yDEP" 
                    message="Redirigiendo a nuestro Discord..." 
                  />} 
        />


        {/* Ruta 404 */}
        <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
