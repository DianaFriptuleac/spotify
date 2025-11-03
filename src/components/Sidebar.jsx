import React, { useState } from "react";
import { Button, Col, Navbar, Nav, InputGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/selectors/authSelectors";
import { logoutUser } from "../redux/action/auth";
import { Offcanvas } from "react-bootstrap";

const Sidebar = ({ handleSearch, handleHomeClick }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuthenticated);

  //Mostra sidebar da mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(query);
      setQuery("");
      closeMobile();
    }
  };

  const goRegister = () => {
    if (isAuth) {
      const ok = window.confirm(
        `You're already registered and logged in. Do you want to log out?`
      );
      if (ok) {
        dispatch(logoutUser());
        navigate("/register", { replace: true });
        closeMobile();
      }
      return;
    }
    navigate("/register");
    closeMobile();
  };

  const goLogin = () => {
    if (isAuth) {
      const ok = window.confirm(
        `You're already logged in. Do you want to log out?`
      );
      if (ok) {
        dispatch(logoutUser());
        navigate("/login", { replace: true });
        //{ replace: true } -> La pag. precedente viene rimossa dalla cronologia
        // se l’utente preme “← Indietro”, non torna alla pagina in cui era loggato.
        closeMobile();
      }
      return;
    }
    navigate("/login");
    closeMobile();
  };

  return (
    <>
      <Button
        className="mobile-menu-toggle"
        onClick={toggleMobile}
        aria-label="Open/Close menu"
      >
        <i className="bi bi-list" />
      </Button>

      <Col md={2}>
        <Navbar
          expand="md"
          className={`left-nav navbar navbar-expand-md fixed-left justify-content-between ${
            mobileOpen ? "open" : ""
          }`}
          fixed="left"
          id="sidebar"
        >
          <div className="sidebar-inner d-flex flex-column">
            <Link
              to="/"
              className="text-decoration-none"
              onClick={() => {
                handleHomeClick();
                closeMobile();
              }}
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
          {/*   <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav"> */}
              <Nav className="flex-column" id="navbar-nav">
                <Link
                  to="/"
                  onClick={() => {
                    handleHomeClick();
                    closeMobile();
                  }}
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <i className="bi bi-house-door-fill"></i>&nbsp; Home
                </Link>
                <Link
                  to="/liked-songs"
                  onClick={closeMobile}
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
                    className="go-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      handleSearch(query);
                      setQuery("");
                      closeMobile();
                    }}
                  >
                    GO
                  </Button>
                </InputGroup>
              </Nav>
        {/*    </Navbar.Collapse> */}
          </div>

          <div className="mt-auto nav-btn">
            <Button className="mb-2 btn signup-btn" onClick={goRegister}>
              Sign Up
            </Button>
            <Button className="btn login-btn" onClick={goLogin}>
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
        {mobileOpen && (
          <div className="sidebar-overlay" onClick={closeMobile} />
        )}
      </Col>
    </>
  );
};

export default Sidebar;
