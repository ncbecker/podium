const fetch = require("node-fetch");

async function getCurrentUserProfile(token) {
  console.log(token);
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

async function getUserProfile(token, userID) {
  const url = `https://api.spotify.com/v1/users/${userID}`;
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

exports.getCurrentUserProfile = getCurrentUserProfile;
exports.getUserProfile = getUserProfile;
exports.getEpisodeInfo = getEpisodeInfo;
