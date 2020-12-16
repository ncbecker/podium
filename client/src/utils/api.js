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

export async function getCurrentUserProfile(token) {
  const response = await fetch("/api/user/profile");
  const userProfileData = response.json();
  return userProfileData;
}

export async function getEpisodeInfo(id) {
  const response = await fetch(`/api/episode/${id}`);
  const episodeData = response.json();
  return episodeData;
}
