import {
  SET_ALBUMS,
  LIKE_SONG,
  SET_SEARCH_RESULTS,
  SET_CURRENT_SONG,
  TOGGLE_PLAY,
} from "../action";

const initialState = {
  albums: {
    rock: [],
    pop: [],
    hiphop: [],
  },
  likedSongs: [],
  searchResults: [],
  currentSong: null,
  isPlaying: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, albums: { ...state.albums, ...action.payload } };
    case LIKE_SONG:
      const likedSong = action.payload;
      return {
        ...state,
        likedSongs: state.likedSongs.some((song) => song.id === likedSong.id)
          ? state.likedSongs.filter((song) => song.id !== likedSong.id) // Rimuovi se già esiste
          : [...state.likedSongs, likedSong], // Aggiungi la canzone
      };

    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_CURRENT_SONG:
      return { ...state, currentSong: action.payload };
    case TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    default:
      return state;
  }
};

export default rootReducer;
