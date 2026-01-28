// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewLanding2 from './pages/Landing';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<NewLanding2 />} />
        {/* Ruta 404 */}
        <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
