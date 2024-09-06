import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LikedSongs = () => {
  const likedSongs = useSelector(state => state.likedSongs);

  return (
    <Col md={10} className="offset-md-2 mt-4">
      <h2>Liked Songs</h2>
      <Row>
        {likedSongs.map(song => (
          <Col key={song.id} md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={song.album.cover_medium} alt="track" />
              <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Card.Text>Artist: {song.artist.name}</Card.Text>
                <Link to={`/song/${song.id}`}>
                  <Button variant="primary">Play</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default LikedSongs;
