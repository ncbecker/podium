export async function getAppAccessToken() {
  const response = await fetch("/oauth/apptoken");
  const data = await response.json();
  return data.access_token;
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
