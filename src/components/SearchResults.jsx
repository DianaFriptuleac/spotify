import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SingleAlbum from './SingleAlbum';

const SearchResults = ({ searchResults, searchQuery }) => (
  <Row className="py-3 text-light">
    <Col md={10}>
      <h2>Search Results for "{searchQuery}"</h2>
      <Row>
        {searchResults.map(song => <SingleAlbum key={song.id} song={song} />)}
      </Row>
    </Col>
  </Row>
);

export default SearchResults;
