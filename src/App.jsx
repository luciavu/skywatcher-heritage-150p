import './App.scss';
import Navbar from './components/navbar/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import GalleryHome from './pages/GalleryHome.jsx';
import Moon from './pages/Moon.jsx';
import Planets from './pages/Planets.jsx';
import Stars from './pages/Stars.jsx';
import DSOs from './pages/DSOs.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Notes from './pages/Notes.jsx';
import Calculator from './pages/Calculator.jsx';
import OtherNotes from './pages/OtherNotes.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />}>
          <Route index element={<GalleryHome />} />

          <Route path="moon" element={<Moon />} />
          <Route path="planets" element={<Planets />} />
          <Route path="stars" element={<Stars />} />
          <Route path="dsos" element={<DSOs />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/morenotes" element={<OtherNotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
