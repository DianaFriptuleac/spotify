import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { setAlbums, setSearchResults } from '../redux/action';
import Sidebar from './Sidebar';
import MainComponent from './MainComponent';

const Home = () => {
  const dispatch = useDispatch();
  const rockAlbums = useSelector(state => state.albums.rock);
  const popAlbums = useSelector(state => state.albums.pop);
  const hiphopAlbums = useSelector(state => state.albums.hiphop);

  const musicSection = async (artistName) => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
      );
      if (response.ok) {
        let { data } = await response.json();
        dispatch(setSearchResults(data));
        dispatch(setAlbums({ [artistName]: data.slice(0, 4) }));
      } else {
        throw new Error('Error in fetching songs');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    musicSection('rock');
    musicSection('pop');
    musicSection('hiphop');
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <MainComponent
          rockAlbums={rockAlbums}
          popAlbums={popAlbums}
          hiphopAlbums={hiphopAlbums}
        />
      </Row>
    </Container>
  );
};

export default Home;


