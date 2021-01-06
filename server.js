require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");

const { connectDb } = require("./lib/database");

const {
  getEpisodeInfo,
  getCurrentUserProfile,
  searchEpisode,
  getManyEpisodeInfos,
} = require("./lib/SpotifyMethods");
const {
  getAppAccessToken,
  getUserAccessToken,
  refreshUserAccessToken,
} = require("./lib/SpotifyAccess");
const {
  getAllEpisodes,
  getAllUsers,
  getSingleEpisode,
  getSingleUser,
  setUser,
  getAllLikedEpisodes,
  setEpisode,
  updateEpisodeLiked,
  updateEpisodeUnliked,
  deleteManyEpisodes,
  deleteEpisode,
  updateUserDisplayName,
} = require("./lib/dbMethods");

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());

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
  response.redirect("https://ncbecker-podium-pr-68.herokuapp.com/vote");
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
    response.redirect(
      "https://ncbecker-podium-pr-68.herokuapp.com/oauth/spotify/authorize"
    );
  }
});

// Spotify API Requests

app.get("/api/user/profile", async (request, response) => {
  let accessToken = request.cookies.access;
  let refreshToken = request.cookies.refresh;

  if (!accessToken && !refreshToken) {
    response.redirect(
      "https://ncbecker-podium-pr-68.herokuapp.com/oauth/spotify/authorize"
    );
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
    response.status(200).send(userProfileData);
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
  response.status(200).send(searchResults);
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
    response.status(200).send(episodeData);
  } catch (error) {
    console.error(error);
    response.status(404).send();
  }
});

app.get("/api/episodes", async (request, response) => {
  const { q } = request.query;
  let appAccessToken = request.cookies.appaccess;
  try {
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
    const episodeInfos = await getManyEpisodeInfos(appAccessToken, q);
    response.status(200).send(episodeInfos);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

// mongoDB Requests

// Users

app.post("/api/db/user/:id", async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    const user = await getSingleUser(id);
    if (user && user.name === name) {
      response.status(200).send("User already exists.");
      return;
    }
    if (user && user.name !== name) {
      await updateUserDisplayName(id, name);
      response.status(200).send("Spotify user name got updated.");
      return;
    }
    await setUser(id, name);
    response.status(200).send("User is set in database.");
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      response.status(409).send("Duplicate ID");
    }
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/db/user/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const singleUser = await getSingleUser(id);
    response.status(200).send(singleUser);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.patch("/api/db/user/:id", async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    const updatedUser = await updateUserDisplayName(id, name);
    response.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/db/users", async (request, response) => {
  try {
    const allUsers = await getAllUsers();
    response.status(200).send(allUsers);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

// Episodes

app.post("/api/db/episode/:id", async (request, response) => {
  const { id } = request.params;
  const { userId } = request.body;
  try {
    await setEpisode(id, userId);
    response.status(200).send("Episode is set in database.");
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      response.status(409).send("Duplicate ID");
    }
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/db/episode/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const singleEpisode = await getSingleEpisode(id);
    response.status(200).send(singleEpisode);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/episode-details/:id", async (request, response) => {
  const { id } = request.params;
  const userId = request.headers.authorization;

  let appAccessToken = request.cookies.appaccess;
  try {
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

    const episodeInDB = await getSingleEpisode(id);
    const episodeInfo = await getEpisodeInfo(appAccessToken, id);
    if (episodeInDB) {
      response.status(200).send({
        ...episodeInfo,
        duration_min: Math.round(episodeInfo.duration_ms / 60000),
        liked: episodeInDB.users.includes(userId),
        likes: episodeInDB.likes,
      });
    } else {
      response.status(200).send({
        ...episodeInfo,
        duration_min: Math.round(episodeInfo.duration_ms / 60000),
        liked: false,
        likes: 0,
      });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.patch("/api/db/episode/:id", async (request, response) => {
  const { id } = request.params;
  const { userId, liked } = request.body;
  try {
    if (liked) {
      await updateEpisodeLiked(id, userId);
    } else {
      await updateEpisodeUnliked(id, userId);
    }
    response.status(200).send("Database updated.");
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      response.status(409).send("Duplicate ID");
    }
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.delete("/api/db/episode/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const deletedEpisode = await deleteEpisode(id);
    response.status(200).send(deletedEpisode);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/db/episodes", async (request, response) => {
  try {
    const allEpisodes = await getAllEpisodes();
    response.status(200).send(allEpisodes);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/db/episodes/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const allLikedEpisodes = await getAllLikedEpisodes(id);
    response.status(200).send(allLikedEpisodes);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/episodes-likes/:id", async (request, response) => {
  const { id } = request.params;
  let appAccessToken = request.cookies.appaccess;
  try {
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
    await deleteManyEpisodes();
    const allEpisodes = await getAllEpisodes();
    const q = allEpisodes.map((item) => item._id).toString();
    const episodeInfos = await getManyEpisodeInfos(appAccessToken, q);
    const allEpisodesAndLikes = allEpisodes.map((data) => ({
      ...data,
      liked: data.users.includes(id),
      ...episodeInfos.episodes.find((episode) => episode.id === data._id),
    }));
    response.status(200).send(allEpisodesAndLikes);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.get("/api/episodes-user/:id", async (request, response) => {
  const { id } = request.params;
  let appAccessToken = request.cookies.appaccess;
  try {
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
    const allLikedEpisodes = await getAllLikedEpisodes(id);
    const q = allLikedEpisodes.map((item) => item._id).toString();
    const episodeInfos = await getManyEpisodeInfos(appAccessToken, q);
    const allLikedEpisodeInfos = allLikedEpisodes.map((data) => ({
      ...data,
      liked: data.users.includes(id),
      ...episodeInfos.episodes.find((episode) => episode.id === data._id),
    }));
    response.status(200).send(allLikedEpisodeInfos);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.delete("/api/db/episodes", async (request, response) => {
  try {
    const deletedEpisodes = await deleteManyEpisodes();
    response.status(200).send(deletedEpisodes);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
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

async function run() {
  try {
    console.log("Connecting to mongoDB...");
    await connectDb(process.env.MONGO_DB_URL, process.env.MONGO_DB_NAME);
    console.log("Successfully connected!");

    app.listen(port, () => {
      console.log(`Podium server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
run();
