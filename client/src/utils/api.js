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

export async function getManyEpisodeInfos(q) {
  const response = await fetch(`/api/episodes?q=${q}`);
  const episodeInfos = await response.json();
  return episodeInfos;
}

// mongoDB

export async function setUserInDB(id, name) {
  await fetch(`/api/db/user/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ name }),
  });
}

export async function getSingleUserFromDB(id) {
  const response = await fetch(`/api/db/user/${id}`);
  const singleUser = await response.json();
  return singleUser;
}

export async function updateUserDisplayNameInDB(id, name) {
  await fetch(`/api/db/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ name }),
  });
}

export async function getAllUsersFromDB() {
  const response = await fetch("/api/db/users");
  const allUsers = await response.json();
  return allUsers;
}

export async function getSingleEpisodeFromDB(id) {
  const response = await fetch(`/api/db/episode/${id}`);
  const singleEpisode = await response.json();
  return singleEpisode;
}

export async function addOrUpdateEpisodeInDB(id, userId, liked) {
  await fetch(`/api/db/episode/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ userId, liked }),
  });
}

export async function updateEpisodeLikeInDB(id, userId, liked) {
  await fetch(`/api/db/episode/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ userId, liked }),
  });
}

export async function getAllEpisodesAndLikes(id) {
  const response = await fetch(`/api/episodes-likes/${id}`);
  const allEpisodesAndLikes = await response.json();
  return allEpisodesAndLikes;
}

export async function getAllLikedEpisodes(id) {
  const response = await fetch(`/api/episodes-user/${id}`);
  const allLikedEpisodes = await response.json();
  return allLikedEpisodes;
}

export async function getEpisodeDetailsFromDB(id, userId) {
  const response = await fetch(`/api/episode-details/${id}`, {
    headers: {
      Authorization: userId,
    },
  });
  const episodeDetails = await response.json();
  return episodeDetails;
}
