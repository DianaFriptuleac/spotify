export const SET_ALBUMS = 'SET_ALBUMS';
export const LIKE_SONG = 'LIKE_SONG';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  payload: albums,
});

export const likeSong = (songId) => ({
  type: LIKE_SONG,
  payload: songId,
});

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});
