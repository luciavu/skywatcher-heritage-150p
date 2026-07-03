import './App.scss';
import Navbar from './components/navbar/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import About from './pages/About.jsx';
import Notes from './pages/Notes.jsx';
import Calculator from './pages/Calculator.jsx';
import Simulator from './pages/Simulator.jsx';
import CameraSettings from './pages/CameraSettings.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/camerasettings" element={<CameraSettings />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
