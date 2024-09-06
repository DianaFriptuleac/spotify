import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { setCurrentSong, togglePlay } from '../redux/action';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.currentSong); // Canzone corrente
  const isPlaying = useSelector(state => state.isPlaying); // Stato di riproduzione
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (currentSong) {
      dispatch(togglePlay());
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (currentSong && currentSong.preview) {
        audioRef.current.src = currentSong.preview; // Imposta la sorgente audio
      }
      if (isPlaying) {
        audioRef.current.play(); // Avvia la riproduzione
      } else {
        audioRef.current.pause(); // Metti in pausa
      }
    }
  }, [currentSong, isPlaying]); // Aggiungi currentSong e isPlaying alle dipendenze
  

  return (
    <div className="fixed-bottom bg-dark text-light py-2">
      {currentSong ? (
        <>
          <audio ref={audioRef} src={currentSong.preview || ''} />
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <div className="d-flex justify-content-between align-items-center">
                <Button variant="link" onClick={() => dispatch(setCurrentSong(/* brano precedente */))}>
                  <FaStepBackward />
                </Button>
                <Button variant="link" onClick={handlePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <Button variant="link" onClick={() => dispatch(setCurrentSong(/* brano successivo */))}>
                  <FaStepForward />
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="mb-0">{currentSong.title}</p>
                <p className="mb-0 text-muted">{currentSong.artist?.name}</p>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <p className="text-center">Seleziona una canzone da riprodurre</p>
      )}
    </div>
  );
};

export default MusicPlayer;



