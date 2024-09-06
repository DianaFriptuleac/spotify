import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { setCurrentSong, togglePlay } from '../redux/action';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.currentSong);
  const isPlaying = useSelector(state => state.isPlaying);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (currentSong) {
      dispatch(togglePlay());
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (currentSong && currentSong.preview) {
        audioRef.current.src = currentSong.preview;
      }
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="fixed-bottom bg-dark text-light py-2">
      {currentSong ? (
        <>
          <audio ref={audioRef} src={currentSong.preview || ''} />
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <div className="d-flex justify-content-between align-items-center">
                <Button className='player-btn' variant="link" onClick={() => dispatch(setCurrentSong(/* previous */))}>
                  <FaStepBackward />
                </Button>
                <Button className='player-btn' variant="link" onClick={handlePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <Button className='player-btn' variant="link" onClick={() => dispatch(setCurrentSong(/* next*/))}>
                  <FaStepForward />
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="mb-0">{currentSong.title}</p>
                <p className="mb-0">{currentSong.artist?.name}</p> {/* Show artist name */}
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <p className="text-center">Select a song to play</p>
      )}
    </div>
  );
};

export default MusicPlayer;




