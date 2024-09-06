import React, { useEffect, useState } from "react";
import { Container, Col, Card, Nav, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Home = () => {
  const [rockAlbums, setRockAlbums] = useState([]);
  const [popAlbums, setPopAlbums] = useState([]);
  const [hiphopAlbums, setHiphopAlbums] = useState([]);

  // Funzione per album card
  const myAlbumCard = (singleSong) => (
    <Col key={singleSong.id} className="text-center mb-4">
      <Card className="border border-0">
        <Card.Img
          variant="top"
          src={singleSong.album.cover_medium}
          alt="track"
        />
         </Card>
       
          <div className="cardBody">
            <p className="mb-0">
            Track: "{singleSong.title}"</p>
           <p> Artist: {singleSong.artist.name}</p>
          </div>
       
     
    </Col>
  );

  // Fetch
  const musicSection = async (artistName, setAlbumState) => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
      );
      if (response.ok) {
        let { data } = await response.json();
        setAlbumState(data.slice(0, 4)); // Save 4 results
      } else {
        throw new Error("Error in fetching songs");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fetch al montaggio dei componenti
  useEffect(() => {
    musicSection("queen", setRockAlbums);
    musicSection("katyperry", setPopAlbums);
    musicSection("eminem", setHiphopAlbums);
  }, []);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <Col md={9} className="offset-md-3 mainPage">
          <Row>
            <Col lg={11}>
              <Nav className="mainLinks d-none d-md-flex">
                <Nav.Link href="#">TRENDING</Nav.Link>
                <Nav.Link href="#">PODCAST</Nav.Link>
                <Nav.Link href="#">MOODS AND GENRES</Nav.Link>
                <Nav.Link href="#">NEW RELEASES</Nav.Link>
                <Nav.Link href="#">DISCOVER</Nav.Link>
              </Nav>
            </Col>
          </Row>

          <Row className="py-3 text-light">
            <Col md={10}>
              <h2>Rock Classics</h2>
              <Row>{rockAlbums.map((song) => myAlbumCard(song))}</Row>
            </Col>
          </Row>

          <Row className="py-3 text-light">
            <Col md={10}>
              <h2>Pop Culture</h2>
              <Row>{popAlbums.map((song) => myAlbumCard(song))}</Row>
            </Col>
          </Row>

          <Row className="py-3 text-light">
            <Col md={10}>
              <h2>#HipHop</h2>
              <Row>{hiphopAlbums.map((song) => myAlbumCard(song))}</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
