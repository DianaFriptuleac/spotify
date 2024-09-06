import { SET_ALBUMS, LIKE_SONG,SET_SEARCH_RESULTS } from "../action";

const initialState = {
  albums: {
    rock: [],
    pop: [],
    hiphop: []
  },
  likedSongs: [],
  searchResults: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, albums: { ...state.albums, ...action.payload } };
    case LIKE_SONG:
      const songId = action.payload;
      return {
        ...state,
        likedSongs: state.likedSongs.includes(songId)
          ? state.likedSongs.filter(id => id !== songId)
          : [...state.likedSongs, songId],
      };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
