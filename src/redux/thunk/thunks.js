import { searchDeezer } from "../../api/deezersrc";
import { setAlbums, setSearchResults } from "../action";

// search
export const fetchSearchResults = (query) => async (dispatch) => {
  const data = await searchDeezer(query);
  dispatch(setSearchResults(data));
  return data;
};

// home albums
export const fetchSection = (sectionKey) => async (dispatch) => {
  const data = await searchDeezer(sectionKey);

  //array mescolato
  const shuffled = [...data].sort(() => Math.random() - 0.5);

  //primi 6 elementi
  const randomSix = shuffled.slice(0, 6);
  dispatch(setAlbums({ [sectionKey]: randomSix }));
  return data;
};

export const fetchHomeSections = () => async (dispatch) => {
  await Promise.all([
    dispatch(fetchSection("rock")),
    dispatch(fetchSection("hiphop")),
    dispatch(fetchSection("latin")),
  ]);
};
