import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaCheckCircle,
} from "react-icons/fa";
import { FaVolumeXmark, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { setCurrentSong, togglePlay } from "../redux/action";
import { useState } from "react";
import { likeSong } from "../redux/action";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.isPlaying);
  const songs = useSelector((state) => state.songs);
  console.log("songs", songs);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(70); // 0 - 100
  const likedSongs = useSelector((state) => state.likedSongs);
const isLiked =
  !!currentSong &&                      // 1) esiste una currentSong? (true/false)
  likedSongs.some(s => s.id === currentSong.id); // 2) c'è una song con lo stesso id nei liked?

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

  //Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };
  const toggleMute = () => {
    setVolume((v) => (v > 0 ? 0 : 70)); //mute o ripristina a 70
  };

  const VolumeIcon = () => {
    if (volume === 0) return <FaVolumeXmark />;
    if (volume < 50) return <FaVolumeLow />;
    return <FaVolumeHigh />;
  };
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

  const handleToggleLike = () => {
    if (!currentSong) return;
    dispatch(likeSong(currentSong));
  };

  return (
    <div className="fixed-bottom bg-black text-light py-3">
      {currentSong ? (
        <>
          <audio ref={audioRef} />
          {/* barra player full width */}
          <div
            className="d-flex justify-content-center px-3"
            style={{ gap: "12px" }}
          >
            {/* CONTROLLI – prima su mobile, al centro su desktop */}
            <div className="d-flex justify-content-center align-items-center flex-grow-1 order-1 order-md-2 w-100 w-md-auto">
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
            {/* TESTO – sotto l'immagine su mobile, affiancato su desktop */}
            <div className="flex-grow-1 order-2 order-md-1 w-100 mt-2 mt-md-0">
              <div className="track-info d-flex flex-column flex-md-row align-items-center">
                <img
                  src={currentSong.album.cover_small}
                  alt="track"
                  className="track-cover mb-2 mb-md-0 me-md-3"
                />
                <div className="text-center text-md-start me-3">
                  {/*text-center -> default (mobile-first) → su schermi piccoli centra
                  text-md-start -> da 768px in su (md breakpoint) allinea a sinistra */}
                  <p className="mb-0">{currentSong.title}</p>
                  <p className="mb-0">{currentSong.artist?.name}</p>
                </div>
                <div>
                  <Button
                    variant="link"
                    style={{ color: " rgb(60, 211, 60)" }}
                    onClick={handleToggleLike}
                    aria-label={isLiked ? "Added to liked" : "Add to liked"}
                    title={
                      isLiked
                        ? "Rimuovi dai preferiti"
                        : "Aggiungi ai preferiti"
                    }
                    disabled={!currentSong}
                  >
                    {isLiked ? <FaCheckCircle /> : <FiPlusCircle />}
                  </Button>
                </div>
              </div>
            </div>

            {/* DESTRA: volume */}
            <div className="d-flex justify-content-end align-items-center flex-grow-1 gap-2 order-3 w-100 w-md-auto mt-2 mt-md-0">
              <Button
                className="player-btn"
                variant="link"
                onClick={toggleMute}
                aria-label="Mute/Unmute"
              >
                <VolumeIcon />
              </Button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                style={{ width: 140, accentColor: " rgb(60, 211, 60)" }}
              />
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Select a song to play</p>
      )}
    </div>
  );
};

export default MusicPlayer;
