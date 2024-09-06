import { Button, Col,Navbar,Nav, InputGroup,Form } from "react-bootstrap"
const Sidebar = () =>{
    return(
    <Col md={2}>
    <Navbar
      expand="md"
      className="left-nav navbar navbar-expand-md fixed-left justify-content-between"
      fixed="left"
        id="sidebar"
    >
      <div className="d-flex flex-column">
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
          <InputGroup className="mt-3 search-input ms-1">
            <Form.Control placeholder="Search" aria-label="Search" />
            <Button variant="outline-secondary">GO</Button>
          </InputGroup>
        </Nav>
      </Navbar.Collapse>
      </div>
      <div className="mt-auto nav-btn">
        <Button variant="primary" className="mb-2 btn signup-btn">
          Sign Up
        </Button>
        <Button variant="secondary" className="btn login-btn">Login</Button>
        <div>
          <a href="#">Cookie Policy</a> | <a href="#"> Privacy</a>
        </div>
      </div>
    </Navbar>
  </Col>
    )
}
export default Sidebar