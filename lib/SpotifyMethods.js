const fetch = require("node-fetch");

async function getEpisodeInfo(token, id) {
  const url = `https://api.spotify.com/v1/episodes/${id}?market=DE`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  });
  const episodeData = await response.json();
  return episodeData;
}

exports.getEpisodeInfo = getEpisodeInfo;
