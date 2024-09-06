import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Navbar, Nav, InputGroup, Form } from 'react-bootstrap';
import { setSearchResults } from '../redux/action';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
      if (response.ok) {
        let { data } = await response.json();
        dispatch(setSearchResults(data));
        setQuery(''); // Clear the input field after search
      } else {
        throw new Error('Error in fetching search results');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const location = useLocation(); 
  //classe active per i link
  const addActiveOrNot = (path) => {
    return location.pathname === '/' + path ? 'nav-link active' : 'nav-link'
  }

  return (
    <Col md={2}>
      <Navbar
        expand="md"
        className="left-nav navbar navbar-expand-md fixed-left justify-content-between"
        fixed="left"
        id="sidebar"
      >
        <div className="d-flex flex-column">
        <Link to ='/' className="text-decoration-none">
          <Navbar.Brand>
            <img
              src="assets/logo/logo.png"
              alt="Spotify Logo"
              width="131"
              height="40"
            />
          </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="flex-column">
            <Link to="/" className={addActiveOrNot('home')}>
           
                <i className="bi bi-house-door-fill"></i>&nbsp; Home
              
              </Link>
              <Link to="/liked-songs" className={addActiveOrNot('liked-songs')}>
            
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
                <Button variant="outline-secondary" onClick={handleSearch}>GO</Button>
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
            <a href="#">Cookie Policy</a> | <a href="#">Privacy</a>
          </div>
        </div>
      </Navbar>
    </Col>
  );
};

export default Sidebar;
