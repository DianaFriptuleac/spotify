import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeSong } from '../redux/action';
import { Col, Card, Button } from 'react-bootstrap';

const SingleAlbum = ({ song }) => {
  const dispatch = useDispatch();
  const likedSongs = useSelector(state => state.likedSongs);

  const handleLike = () => {
    dispatch(likeSong(song.id));
  };

  const isLiked = likedSongs.includes(song.id);

  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={3}  className="text-center mb-4">
      <Card className="border border-0">
        <Card.Img variant="top" src={song.album.cover_medium} alt="track" />
      </Card>
      <div className="cardBody">
        <p className="mb-0">Track: "{song.title}"</p>
        <p>Artist: {song.artist.name}</p>
        <Button variant={isLiked ? 'primary' : 'secondary'} onClick={handleLike}>
          {isLiked ? 'Liked' : 'Like'}
        </Button>
      </div>
    </Col>
  );
};

export default SingleAlbum;
