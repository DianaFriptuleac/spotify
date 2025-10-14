export const isDev = process.env.NODE_ENV === "development";
 //API
  // *process.env.NODE_ENV* ->  impostato automaticamente a "development" con npm start/ a "production" quando si fa il build per Vercel o un altro host
export const API_SEARCH_URL = isDev
  ? "https://striveschool-api.herokuapp.com/api/deezer/search"
  : "/api/deezer"; 

  //Fetch base
export async function searchDeezer(query, {limit = 100, index = 0} = {}) {
  const res = await fetch(`${API_SEARCH_URL}?q=${encodeURIComponent(query)}&limit=${limit}&index=${index}`);
  if (!res.ok) throw new Error("Errore nel recupero dati");
  const { data } = await res.json();
  return data;
}
