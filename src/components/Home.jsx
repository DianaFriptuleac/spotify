import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { setAlbums, setSearchResults } from '../redux/action';
import Sidebar from './Sidebar';
import MainComponent from './MainComponent';
import MusicPlayer from './MusicPlayer';

const Home = () => {
  const dispatch = useDispatch();
  const rockAlbums = useSelector(state => state.albums.rock);
  const popAlbums = useSelector(state => state.albums.pop);
  const hiphopAlbums = useSelector(state => state.albums.hiphop);
  const latinAlbums = useSelector(state => state.albums.latin)
  const searchResults = useSelector(state => state.searchResults);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');



  const musicSection = async (artistName) => {
    try {
   /*    let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
      ); */  // develop
     let response = await fetch(`/api/deezer/?q=${artistName}`);  //vercel
      if (response.ok) {
        let { data } = await response.json();
        dispatch(setSearchResults(data));  //popolo i risultati della ricerca son setSearchResults
        dispatch(setAlbums({ [artistName]: data.slice(0, 6) })); //salvo i dati nello stato di Redux setAlbum
      } else {
        throw new Error('Errore nel recupero dati');
      }
    } catch (err) {
      console.error('errore', err);
    }
  };
//invoco musicSection 
  useEffect(() => {
    musicSection('rock');
    musicSection('pop');
    musicSection('hiphop');
    musicSection('latin');
  }, [dispatch]);

  //ricerca dinamica
  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
     /*  let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`); */ // develop
     let response = await fetch(`/api/deezer/?q=${query}`);  //vercel
      if (response.ok) {
        let { data } = await response.json();
        dispatch(setSearchResults(data));  
        setHasSearched(true);  //true se mostra risultati di ricerca
      } else {
        throw new Error('Errore nel recuper dati');
      }
    } catch (err) {
      console.error('errore', err);
    }
  };

  //Ripristino i album di default e resetto lo stato della ricerca
  const handleHomeClick = () => {
    setHasSearched(false);
    setSearchQuery('');
  };

  return (
    <Container fluid>
      <Row>
        <Sidebar handleSearch={handleSearch} handleHomeClick={handleHomeClick} />
        <MainComponent
          rockAlbums={rockAlbums}
          popAlbums={popAlbums}
          hiphopAlbums={hiphopAlbums}
          latinAlbums={latinAlbums}
          searchResults={searchResults}
          searchQuery={searchQuery}
          hasSearched={hasSearched}
        />
      </Row>
      <Row className='music-player'>
        <MusicPlayer />
      </Row>
    </Container>
  );
};

export default Home;

