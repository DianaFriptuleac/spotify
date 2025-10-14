import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { setAlbums, setSearchResults } from "../redux/action";
import Sidebar from "./Sidebar";
import MainComponent from "./MainComponent";
import MusicPlayer from "./MusicPlayer";
import { fetchHomeSections, fetchSearchResults } from "../redux/thunk/thunks";

const Home = () => {
  const dispatch = useDispatch();
  const rockAlbums = useSelector((state) => state.albums.rock);
  const hiphopAlbums = useSelector((state) => state.albums.hiphop);
  const latinAlbums = useSelector((state) => state.albums.latin);
  const searchResults = useSelector((state) => state.searchResults);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /*   //API
  // *process.env.NODE_ENV* ->  impostato automaticamente a "development" con npm start/ a "production" quando si fa il build per Vercel o un altro host
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "https://striveschool-api.herokuapp.com/api/deezer"
      : "/api/deezer";

  const musicSection = async (artistName) => {
    try {
      // develop
      /*      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
      );   */
  //vercel
  // let response = await fetch(`/api/deezer/search?q=${artistName}`);

  /*   let response = await fetch(`${API_BASE_URL}/search?q=${artistName}`);

      if (response.ok) {
        let { data } = await response.json();
        dispatch(setSearchResults(data)); //popolo i risultati della ricerca son setSearchResults
        dispatch(setAlbums({ [artistName]: data.slice(0, 6) })); //salvo i dati nello stato di Redux setAlbum
      } else {
        throw new Error("Errore nel recupero dati");
      }
    } catch (err) {
      console.error("errore", err);
    }
  };
  //invoco musicSection
  useEffect(() => {
    musicSection("rock");
    musicSection("pop");
    musicSection("hiphop");
    musicSection("latin");
  }, [dispatch]);

  //ricerca dinamica
  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      // develop
      // let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
      //vercel
      //  let response = await fetch(`/api/deezer/search?q=${query}`);
      let response = await fetch(`${API_BASE_URL}/search?q=${query}`);

      if (response.ok) {
        let { data } = await response.json();
        dispatch(setSearchResults(data));
        setHasSearched(true); //true se mostra risultati di ricerca
      } else {
        throw new Error("Errore nel recuper dati");
      }
    } catch (err) {
      console.error("errore", err);
    }
  }; */

  useEffect(() => {
    dispatch(fetchHomeSections());
  }, [dispatch]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      await dispatch(fetchSearchResults(query));
      setHasSearched(true);
    } catch (error) {
      console.log("Error", error);
    }
  };
  //Ripristino i album di default e resetto lo stato della ricerca
  const handleHomeClick = () => {
    setHasSearched(false);
    setSearchQuery("");
    dispatch(fetchHomeSections()); //ricarica le sezioni
  };

  // music della nav
  const handleNavClick = async (category) => {
    try {
      await dispatch(fetchSearchResults(category));
      setSearchQuery(category);
      setHasSearched(true);
    } catch (error) {
      console.log("Error music category", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Sidebar
          handleSearch={handleSearch}
          handleHomeClick={handleHomeClick}
        />
        <MainComponent
          rockAlbums={rockAlbums}
          hiphopAlbums={hiphopAlbums}
          latinAlbums={latinAlbums}
          searchResults={searchResults}
          searchQuery={searchQuery}
          hasSearched={hasSearched}
          onNavClick={handleNavClick}
        />
      </Row>
      <Row className="music-player">
        <MusicPlayer />
      </Row>
    </Container>
  );
};

export default Home;
