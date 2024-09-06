import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeSong, setCurrentSong } from '../redux/action';
import { Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const SingleAlbum = ({ song }) => {
  const dispatch = useDispatch();
  const likedSongs = useSelector(state => state.likedSongs);

  const handleLike = () => {
    dispatch(likeSong(song));
  };

  const handlePlay = () => {
    dispatch(setCurrentSong(song)); 
  };

  const isLiked = likedSongs.some((likedSong) => likedSong.id === song.id);

  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2} className="text-center mb-4">
      <Card className="border border-0" onClick={handlePlay}>
        <Card.Img variant="top" src={song.album.cover_medium} alt="track" />
      </Card>
      <div className="cardBody">
        <Button className='like-btn' variant={isLiked ? 'like-btn' : ''} onClick={handleLike}>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </Button>
      </div>
    </Col>
  );
};

export default SingleAlbum;

