export const SET_ALBUMS = 'SET_ALBUMS';
export const LIKE_SONG = 'LIKE_SONG';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  payload: albums,
});

export const likeSong = (song) => ({
    type: LIKE_SONG,
    payload: song,
  });

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});
export const setCurrentSong = (song) => ({
    type: SET_CURRENT_SONG,
    payload: song,
  });
  
  export const togglePlay = () => ({
    type: TOGGLE_PLAY,
  });