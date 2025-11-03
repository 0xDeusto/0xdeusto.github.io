// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewLanding2 from './pages/Landing';
import DecodeCloseSection from './components/sections/DecodeCloseSection';


function App() {
  return (
    <Router basename="/0xD3C0D3-site">
      <Routes>
      
        <Route path="/" element={<NewLanding2 />} />

        <Route path="/animation" element={<DecodeCloseSection />} />


        {/* Ruta 404 */}
        <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
