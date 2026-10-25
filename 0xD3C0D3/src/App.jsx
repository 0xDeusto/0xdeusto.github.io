// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewLanding2 from './pages/Landing';
import Join from './pages/Join';
import JoinProvider from './components/join/JoinProvider';

function App() {
  return (
    <Router basename="/">
      <JoinProvider>
        <Routes>
          <Route path="/" element={<NewLanding2 />} />
          <Route path="/unete" element={<Join />} />
          {/* Ruta 404 */}
          <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
        </Routes>
      </JoinProvider>
    </Router>
  );
}

export default App;
