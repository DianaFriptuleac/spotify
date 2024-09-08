import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { setCurrentSong, togglePlay } from "../redux/action";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.isPlaying);
  const songs = useSelector((state) => state.songs);
  console.log("songs", songs);
  const audioRef = useRef(null);

  // Gestione della riproduzione e pausa
  const handlePlayPause = () => {
    if (currentSong) {
      dispatch(togglePlay());
    }
  };

  // Cambia la canzone corrente e gestisce la riproduzione
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.preview;

      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log("Errore durante la riproduzione", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  // Funzioni per passare alla canzone successiva e precedente
  const handleNext = () => {
    if (currentSong && songs.length > 0) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentSong.id
      );
      const nextSong =
        currentIndex !== -1 && songs[currentIndex + 1]
          ? songs[currentIndex + 1]
          : songs[0]; // Loop della prima canzone
      dispatch(setCurrentSong(nextSong));
    }
  };

  const handlePrevious = () => {
    if (currentSong && songs.length > 0) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentSong.id
      );
      const previousSong =
        currentIndex !== -1 && songs[currentIndex - 1]
          ? songs[currentIndex - 1]
          : songs[songs.length - 1]; // Loop dell'ultima canzone
      dispatch(setCurrentSong(previousSong));
    }
  };

  return (
    <div className="fixed-bottom bg-dark text-light py-2">
      {currentSong ? (
        <>
          <audio ref={audioRef} />
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  className="player-btn"
                  variant="link"
                  onClick={handlePrevious}
                >
                  <FaStepBackward />
                </Button>
                <Button
                  className="player-btn"
                  variant="link"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <Button
                  className="player-btn"
                  variant="link"
                  onClick={handleNext}
                >
                  <FaStepForward />
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="mb-0">{currentSong.title}</p>
                <p className="mb-0">{currentSong.artist?.name}</p>
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
