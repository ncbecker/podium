require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");

const {
  getEpisodeInfo,
  getCurrentUserProfile,
} = require("./lib/SpotifyMethods");
const {
  getAppAccessToken,
  getUserAccessToken,
  refreshUserAccessToken,
} = require("./lib/SpotifyAccess");

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());

// OAuth Spotify

app.get("/oauth/spotify/authorize", (request, response) => {
  const url =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      scope: "user-read-private user-read-email",
      redirect_uri: process.env.REDIRECT_URI,
    });
  response.redirect(url);
});

app.get("/oauth/spotify/validate", async (request, response) => {
  const { code } = request.query;
  const {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
  } = await getUserAccessToken(code);
  response.setHeader(
    "Set-Cookie",
    `access=${JSON.stringify({
      accessToken,
      refreshToken,
    })};path=/;Max-Age=${expiresIn}`
  );
  response.send("Authorized. You can close this window :)");
});

app.get("/oauth/spotify/apptoken", async (request, response) => {
  const appToken = await getAppAccessToken();
  response.send(appToken);
});

app.get("/oauth/spotify/usertoken", async (request, response) => {
  const authCode = request.headers.authorization;
  const userToken = await getUserAccessToken(authCode);
  response.send(userToken);
});

app.get("/oauth/spotify/refreshtoken", async (request, response) => {
  const refreshToken = request.headers.authorization;
  const refreshedAccessToken = await refreshUserAccessToken(refreshToken);
  response.send(refreshedAccessToken);
});

// Spotify API

app.get("/api/user/profile", async (request, response) => {
  const { access } = request.cookies;
  const { accessToken } = JSON.parse(access);

  const userProfileData = await getCurrentUserProfile(accessToken);
  response.send(userProfileData);
});

app.get("/api/episode/:id", async (request, response) => {
  const { id } = request.params;
  const token = request.headers.authorization;
  const episodeData = await getEpisodeInfo(token, id);
  response.send(episodeData);
});

// Serve any static files
app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
