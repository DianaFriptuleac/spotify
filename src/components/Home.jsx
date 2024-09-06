import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Card,
  Navbar,
  Nav,
  Row,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";

const Home = () => {
  const [rockAlbums, setRockAlbums] = useState([]);
  const [popAlbums, setPopAlbums] = useState([]);
  const [hiphopAlbums, setHiphopAlbums] = useState([]);

  // Funzione per album card
  const myAlbumCard = (singleSong) => (
    <Col key={singleSong.id} className="text-center mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={singleSong.album.cover_medium}
          alt="track"
        />
        <Card.Body>
          <Card.Text>
            Track: "{singleSong.title}"<br />
            Artist: {singleSong.artist.name}
          </Card.Text>
        </Card.Body>
      </Card>
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
        <Col md={2}>
          <Navbar
            bg="light"
            expand="md"
            className="d-flex flex-column align-items-start"
            fixed="left"
          >
            <Navbar.Brand href="/">
              <img
                src="assets/logo/logo.png"
                alt="Spotify Logo"
                width="131"
                height="40"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="flex-column">
                <Nav.Link href="#">
                  <i className="bi bi-house-door-fill"></i>&nbsp; Home
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="bi bi-book-fill"></i>&nbsp; Your Library
                </Nav.Link>
                <InputGroup className="mt-3">
                  <Form.Control placeholder="Search" aria-label="Search" />
                  <Button variant="outline-secondary">GO</Button>
                </InputGroup>
              </Nav>
            </Navbar.Collapse>
            <div className="mt-auto">
              <Button variant="primary" className="mb-2">
                Sign Up
              </Button>
              <Button variant="secondary">Login</Button>
              <div>
                <a href="#">Cookie Policy</a> | <a href="#"> Privacy</a>
              </div>
            </div>
          </Navbar>
        </Col>

        {/* Main Section */}
        <Col md={9} className="offset-md-3 mainPage">
          <Row>
            <Col lg={11} className="d-none d-md-flex">
              <Nav className="mainLinks">
                <Nav.Link href="#">TRENDING</Nav.Link>
                <Nav.Link href="#">PODCAST</Nav.Link>
                <Nav.Link href="#">MOODS AND GENRES</Nav.Link>
                <Nav.Link href="#">NEW RELEASES</Nav.Link>
                <Nav.Link href="#">DISCOVER</Nav.Link>
              </Nav>
            </Col>
          </Row>

          <Row className="py-3">
            <Col md={10}>
              <h2>Rock Classics</h2>
              <Row>{rockAlbums.map((song) => myAlbumCard(song))}</Row>
            </Col>
          </Row>

          <Row className="py-3">
            <Col md={10}>
              <h2>Pop Culture</h2>
              <Row>{popAlbums.map((song) => myAlbumCard(song))}</Row>
            </Col>
          </Row>

          <Row className="py-3">
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
