import { Col, Row, Nav } from "react-bootstrap";
import SingleAlbum from "./SingleAlbum";

const MainComponent = ({ rockAlbums, popAlbums, hiphopAlbums }) => (
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
        <Row>{rockAlbums.map(song => <SingleAlbum key={song.id} song={song} />)}</Row>
      </Col>
    </Row>

    <Row className="py-3 text-light">
      <Col md={10}>
        <h2>Pop Culture</h2>
        <Row>{popAlbums.map(song => <SingleAlbum key={song.id} song={song} />)}</Row>
      </Col>
    </Row>

    <Row className="py-3 text-light">
      <Col md={10}>
        <h2>#HipHop</h2>
        <Row>{hiphopAlbums.map(song => <SingleAlbum key={song.id} song={song} />)}</Row>
      </Col>
    </Row>
  </Col>
);

export default MainComponent;
