import { Col, Card } from "react-bootstrap";
const SingleAlbum =  ({ song }) => (
    <Col key={song.id} className="text-center mb-4">
      <Card className="border border-0">
        <Card.Img
          variant="top"
          src={song.album.cover_medium}
          alt="track"
        />
      </Card>
      <div className="cardBody">
        <p className="mb-0">Track: "{song.title}"</p>
        <p>Artist: {song.artist.name}</p>
      </div>
    </Col>
  );
  export default SingleAlbum