import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import Home from './components/Home';
import LikedSongs from './components/LikedSongs';
import MusicPlayer from './components/MusicPlayer';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";


const App = () => (
  <BrowserRouter>
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liked-songs" element={<LikedSongs />} />
      <Route path="/song/:id" element={<MusicPlayer />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </main>
 </BrowserRouter>
);

export default App;
