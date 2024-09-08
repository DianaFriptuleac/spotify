import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { setCurrentSong,removeFromLikedSongs } from "../redux/action";
import MusicPlayer from "./MusicPlayer";
import { useNavigate } from "react-router-dom";
import { FaCirclePlay, FaHeartCircleXmark} from "react-icons/fa6";

const LikedSongs = () => {
  const navigate = useNavigate();
  const likedSongs = useSelector((state) => state.likedSongs); // lista delle canzoni preferite
  const dispatch = useDispatch(); 

  const handlePlay = (song) => {
    dispatch(setCurrentSong(song)); // Imposta la canzone corrente nel player
  };

  const handleRemoveFromLiked = (song) => {
    dispatch(removeFromLikedSongs(song.id)); // Rimuovi la canzone dalla lista dei preferiti
  };

  return (
    <Container>
      <h2 className="text-light my-3">My list</h2>
      <Row>
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => (
            <Col
              sm={12}
              md={6}
              lg={3}
              xl={2}
              key={song.id || index}  //key id oppure l'inice se nn ha l'id
              className="mb-4"
            >
              <Card className="card">
                <Card.Img
                  variant="top"
                  src={
                    song.album?.cover_medium ||
                    "https://via.placeholder.com/150"
                  } // Usa un placeholder se manca la copertina
                  alt={song.title}
                />
              </Card>
              <div className="text-light d-flex justify-content-between">
                <p>{song.title || "Unknown Title"}</p>
                <p className="nameSong">
                  Artist: {song.artist?.name || "Unknown Artist"}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <Button
                  className="play-btn border border-1 d-flex align-items-center"
                  variant="seccondary"
                  onClick={() => handlePlay(song)}
                >
                  <FaCirclePlay />
                </Button>
                <Button
                  className="play-btn border border-1 d-flex align-items-center"
                   variant="seccondary"
                  onClick={() => {
                    navigate("/"); //riporta a homepage
                  }}
                >
                 <p className="m-0"> Home</p>
                </Button>
                <Button
                  className="remove-btn border border-1 d-flex align-items-center"
                  variant="seccondary"
                  onClick={() => handleRemoveFromLiked(song)}
                >
                  <FaHeartCircleXmark /> {/* Icona per rimuovere dai preferiti */}
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <>
            <p className="text-light">No liked songs available.</p>
            <Button
              className="btn-notFound w-25"
              variant="success"
              onClick={() => {
                navigate("/"); //riporta a homepage
              }}
            >
              TORNA IN HOMEPAGE
            </Button>
          </>
        )}
      </Row>
      <Row className='like-player'>
      <MusicPlayer />
      </Row>
    </Container>
  );
};

export default LikedSongs;
