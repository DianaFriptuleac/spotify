import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { setCurrentSong } from '../redux/action';

const LikedSongs = () => {
  const likedSongs = useSelector(state => state.likedSongs); // Ottieni la lista delle canzoni preferite
  const dispatch = useDispatch();

  const handlePlay = (song) => {
    dispatch(setCurrentSong(song)); // Imposta la canzone corrente nel player
  };

  return (
    <Col md={10} className="offset-md-2 mt-4">
      <h2 className='text-light'>Liked Songs</h2>
      <Row>
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => (
            <Col key={song.id || index} md={3} className="mb-4">
              <Card>
              <Card.Img 
  variant="top" 
  src={song.album?.cover_medium || 'https://via.placeholder.com/150'} // Usa un placeholder se manca la copertina
  alt={song.title}
/>
                <Card.Body>
                  <Card.Title>{song.title || 'Unknown Title'}</Card.Title>
                  <Card.Text>Artist: {song.artist?.name || 'Unknown Artist'}</Card.Text>
                  <Button variant="primary" onClick={() => handlePlay(song)}>
                    Play
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No liked songs available.</p>
        )}
      </Row>
    </Col>
  );
};

export default LikedSongs;


