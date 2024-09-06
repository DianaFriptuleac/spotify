import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import { setCurrentSong } from '../redux/action';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.currentSong);
  const isPlaying = useSelector(state => state.isPlaying);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    dispatch(setCurrentSong());
  };

  useEffect(() => {
    if (currentSong) {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="fixed-bottom bg-dark text-light py-2">
      <audio ref={audioRef} src={currentSong ? currentSong.previewUrl : ''} />
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex justify-content-between align-items-center">
            {/* Your player controls here */}
            <Button variant="link" onClick={handlePlayPause}>
              <img src={isPlaying ? "assets/playerbuttons/pause.png" : "assets/playerbuttons/play.png"} alt="play/pause" />
            </Button>
         
          </div>
          {currentSong && (
            <div className="text-center mt-2">
              <p className="mb-0">{currentSong.title}</p>
              <p className="mb-0 text-muted">{currentSong.artist}</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MusicPlayer;

