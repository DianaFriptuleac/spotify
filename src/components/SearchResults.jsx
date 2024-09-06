import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SingleAlbum from './SingleAlbum';

const SearchResults = ({ searchResults, searchQuery }) => {
  return (
    <Col md={10} className="py-3 text-light">
      <h2>Results for "{searchQuery}"</h2>
      <Row>
        {searchResults.map(song => (
          <SingleAlbum key={song.id} song={song} />
        ))}
      </Row>
    </Col>
  );
};

export default SearchResults;
