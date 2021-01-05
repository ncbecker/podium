const fetch = require("node-fetch");
const querystring = require("querystring");

async function getCurrentUserProfile(token) {
  const url = "https://api.spotify.com/v1/me";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  });
  const userProfileData = await response.json();
  return userProfileData;
}

async function getUserProfile(token, userId) {
  const url = `https://api.spotify.com/v1/users/${userId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  });
  const userProfileData = await response.json();
  return userProfileData;
}

async function searchEpisode(token, q) {
  const url =
    "https://api.spotify.com/v1/search?" +
    querystring.stringify({
      q: q,
      type: "episode",
      market: "DE",
      limit: "10",
    });
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  });
  const searchResults = await response.json();
  return searchResults;
}

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

async function getManyEpisodeInfos(token, q) {
  const url =
    "https://api.spotify.com/v1/episodes/?" +
    querystring.stringify({
      ids: q,
      market: "DE",
    });
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  });
  const searchResults = await response.json();
  return searchResults;
}

exports.getCurrentUserProfile = getCurrentUserProfile;
exports.getUserProfile = getUserProfile;
exports.searchEpisode = searchEpisode;
exports.getEpisodeInfo = getEpisodeInfo;
exports.getManyEpisodeInfos = getManyEpisodeInfos;
