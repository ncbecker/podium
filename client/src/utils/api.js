// OAuth Spotify API

export async function getAppAccessToken() {
  return await fetch("/oauth/spotify/apptoken");
}

export async function getUserAccessToken(authCode) {
  return await fetch("/oauth/spotify/usertoken");
}

export async function refreshUserAccessToken(refreshToken) {
  return await fetch("/oauth/spotify/refreshtoken");
}

export async function logoutUser() {
  return await fetch("/oauth/spotify/logout");
}

// Spotify API

export async function getCurrentUserProfile(token) {
  const response = await fetch("/api/user/profile");
  const userProfileData = await response.json();
  return userProfileData;
}

export async function searchEpisode(q) {
  const response = await fetch(`/api/search?q=${q}`);
  const searchResults = await response.json();
  return searchResults.episodes.items;
}

export async function getEpisodeInfo(id) {
  const response = await fetch(`/api/episode/${id}`);
  const episodeData = await response.json();
  return episodeData;
}

// mongoDB

export async function getSingleUser(id) {
  const response = await fetch(`/api/db/user/${id}`);
  const singleUser = await response.json();
  return singleUser;
}

export async function getSingleEpisode(id) {
  const response = await fetch(`/api/db/episode/${id}`);
  const singleEpisode = await response.json();
  return singleEpisode;
}

export async function getAllUsers(id) {
  const response = await fetch("/api/db/users");
  const allUsers = await response.json();
  return allUsers;
}

export async function getAllEpisodes(id) {
  const response = await fetch("/api/db/episodes");
  const allEpisodes = await response.json();
  return allEpisodes;
}
