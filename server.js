require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");

const {
  getEpisodeInfo,
  getCurrentUserProfile,
  searchEpisode,
} = require("./lib/SpotifyMethods");
const {
  getAppAccessToken,
  getUserAccessToken,
  refreshUserAccessToken,
} = require("./lib/SpotifyAccess");

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());

// OAuth Spotify API

// Client Credentials Flow

app.get("/oauth/spotify/apptoken", async (request, response) => {
  const { access_token, expires_in } = await getAppAccessToken();
  response.cookie("appaccess", access_token, {
    maxAge: (expires_in - 60) * 1000,
  });
  response.status(200).send("App Access Token Cookie is set!");
});

// Authorization Code Flow

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
  const { access_token, expires_in, refresh_token } = await getUserAccessToken(
    code
  );
  response.cookie("access", access_token, {
    maxAge: (expires_in - 60) * 1000,
  });
  response.cookie("refresh", refresh_token);
  response.redirect("/vote");
});

app.get("/oauth/spotify/logout", async (request, response) => {
  response.clearCookie("access");
  response.clearCookie("refresh");
  response.status(200).send("Cookies cleared");
});

app.get("/oauth/spotify/refreshtoken", async (request, response) => {
  let refreshToken = request.cookies.refresh;
  try {
    const {
      access_token,
      expires_in,
      refresh_token,
    } = await refreshUserAccessToken(refreshToken);

    response.cookie("access", access_token, {
      maxAge: (expires_in - 60) * 1000,
    });

    if (refresh_token) {
      response.cookie("refresh", refresh_token);
      refreshToken = refresh_token;
    }
  } catch (error) {
    console.error(error);
    response.redirect("/oauth/spotify/authorize");
  }
});

// Spotify API Requests

app.get("/api/user/profile", async (request, response) => {
  let accessToken = request.cookies.access;
  let refreshToken = request.cookies.refresh;

  if (!accessToken && !refreshToken) {
    response.redirect("/oauth/spotify/authorize");
    return;
  }

  if (!accessToken) {
    const {
      access_token,
      expires_in,
      refresh_token,
    } = await refreshUserAccessToken(refreshToken);

    response.cookie("access", access_token, {
      maxAge: (expires_in - 60) * 1000,
    });
    accessToken = access_token;

    if (refresh_token) {
      response.cookie("refresh", refresh_token);
      refreshToken = refresh_token;
    }
  }

  try {
    const userProfileData = await getCurrentUserProfile(accessToken);
    response.send(userProfileData);
  } catch (error) {
    console.error(error);
    response.status(401).send();
  }
});

app.get("/api/search", async (request, response) => {
  const { q } = request.query;
  let appAccessToken = request.cookies.appaccess;
  if (!appAccessToken) {
    const {
      access_token: newAppAccessToken,
      expires_in: expiresIn,
    } = await getAppAccessToken();
    response.cookie("appaccess", newAppAccessToken, {
      maxAge: (expiresIn - 60) * 1000,
    });
    appAccessToken = newAppAccessToken;
  }
  const searchResults = await searchEpisode(appAccessToken, q);
  response.send(searchResults);
});

app.get("/api/episode/:id", async (request, response) => {
  const { id } = request.params;
  let appAccessToken = request.cookies.appaccess;

  if (!appAccessToken) {
    const { access_token, expires_in } = await getAppAccessToken();
    response.cookie("appaccess", access_token, {
      maxAge: (expires_in - 60) * 1000,
    });
    appAccessToken = access_token;
  }

  try {
    const episodeData = await getEpisodeInfo(appAccessToken, id);
    response.send(episodeData);
  } catch (error) {
    console.error(error);
    response.status(404).send();
  }
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
  console.log(`Podium server listening at http://localhost:${port}`);
});
