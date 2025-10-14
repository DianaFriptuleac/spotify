import React from "react";
import { Col, Row, Nav } from "react-bootstrap";
import SingleAlbum from "./SingleAlbum";
import SearchResults from "./SearchResults";

const MainComponent = ({ rockAlbums, hiphopAlbums,latinAlbums, searchResults, searchQuery, hasSearched, onNavClick }) => (
  <Col md={9} className="offset-md-3 mainPage">
    <Row>
      <Col lg={11}>
        <Nav className="mainLinks d-none d-md-flex">
          <Nav.Link onClick={() => onNavClick("trending")}>TRENDING</Nav.Link>
          <Nav.Link onClick={() => onNavClick("podcast")}>PODCAST</Nav.Link>
          <Nav.Link onClick={() => onNavClick("mood")}>MOODS AND GENRES</Nav.Link>
          <Nav.Link onClick={() => onNavClick("new")}>NEW RELEASES</Nav.Link>
          <Nav.Link onClick={() => onNavClick("discover")}>DISCOVER</Nav.Link>
        </Nav>
      </Col>
    </Row>

    {hasSearched ? (
      <SearchResults searchResults={searchResults} searchQuery={searchQuery} />
    ) : (
      <>
        <Row className="py-3 text-light">
          <Col md={10}>
            <h2>Rock Classics</h2>
            <Row>{rockAlbums.map(song => <SingleAlbum key={song.id} song={song} />)}</Row>
          </Col>
        </Row>

        <Row className="py-3 text-light">
          <Col md={10}>
            <h2>#HipHop</h2>
            <Row>{hiphopAlbums.map(song => <SingleAlbum key={song.id} song={song} />)}</Row>
          </Col>
        </Row>
           <Row className="py-3 text-light">
          <Col md={10}>
            <h2>Latin Music</h2>
            <Row>{latinAlbums.map(song => <SingleAlbum key={song.id} song={song} />)}</Row>
          </Col>
        </Row>
      </>
    )}
  </Col>
);

export default MainComponent;





