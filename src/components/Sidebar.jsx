import React, { useState } from "react";
import { Button, Col, Navbar, Nav, InputGroup, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ handleSearch, handleHomeClick }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(query);
      setQuery("");
    }
  };

  return (
    <Col md={2}>
      <Navbar
        expand="md"
        className="left-nav navbar navbar-expand-md fixed-left justify-content-between"
        fixed="left"
        id="sidebar"
      >
        <div className="d-flex flex-column">
          <Link
            to="/"
            className="text-decoration-none"
            onClick={handleHomeClick}
          >
            <Navbar.Brand>
              <img
                className="mt-2"
                src="assets/logo/spotify.png"
                alt="Spotify Logo"
                width="131"
                height="40"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="flex-column">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <i className="bi bi-house-door-fill"></i>&nbsp; Home
              </Link>
              <Link
                to="/liked-songs"
                className={`nav-link ${
                  location.pathname === "/liked-songs" ? "active" : ""
                }`}
              >
                <i className="bi bi-book-fill"></i>&nbsp; Your Library
              </Link>
              <InputGroup className="mt-3 search-input ms-1">
                <Form.Control
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    handleSearch(query);
                    setQuery(""); 
                  }}
                >
                  GO
                </Button>
              </InputGroup>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="mt-auto nav-btn">
          <Button variant="primary" className="mb-2 btn signup-btn">
            Sign Up
          </Button>
          <Button variant="secondary" className="btn login-btn">
            Login
          </Button>
          <div>
            <a href="https://support.spotify.com/it/category/safety-privacy/">
              Cookie Policy
            </a>{" "}
            |{" "}
            <a href="https://support.spotify.com/it/category/safety-privacy/">
              Privacy
            </a>
          </div>
        </div>
      </Navbar>
    </Col>
  );
};

export default Sidebar;
