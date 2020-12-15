export async function getAppAccessToken() {
  const response = await fetch("/oauth/spotify/apptoken");
  const data = await response.json();
  return data.access_token;
}

export async function authorizeUser() {
  const response = await fetch("/oauth/spotify/authorize");
  const url = await response.text();
  console.log(url);
  return url;
}

export async function getUserAccessToken(authCode) {
  const response = await fetch("/oauth/spotify/usertoken", {
    headers: {
      Authorization: authCode,
    },
  });
  const data = await response.json();
  console.log(data);
  return data.access_token;
}

export async function refreshUserAccessToken(refreshToken) {
  const response = await fetch("/oauth/spotify/refreshtoken", {
    headers: {
      Authorization: refreshToken,
    },
  });
  const data = await response.json();
  console.log(data);
  return data.access_token;
}

export async function getCurrentUserProfile(token) {
  const response = await fetch("api/user/profile", {
    headers: {
      Authorization: token,
    },
  });
  const userProfileData = response.json();
  return userProfileData;
}

export async function getEpisodeInfo(token, id) {
  const response = await fetch(`/api/episode/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  const episodeData = response.json();
  return episodeData;
}
