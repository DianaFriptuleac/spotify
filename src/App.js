import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import Home from './components/Home';
import LikedSongs from './components/LikedSongs';
import MusicPlayer from './components/MusicPlayer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liked-songs" element={<LikedSongs />} />
      <Route path="/song/:id" element={<MusicPlayer />} />
    </Routes>
  </Router>
);

export default App;
