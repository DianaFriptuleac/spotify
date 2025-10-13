// /api/deezer.js
export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    const upstream = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(q)}`
    );

    // se l'upstream risponde con errore, propagalo
    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(upstream.status).json({ error: text || "Upstream error" });
    }

    const data = await upstream.json();

    // caching lato edge 
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Proxy error", details: String(err) });
  }
}
