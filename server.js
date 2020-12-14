require("dotenv").config();
const express = require("express");
const path = require("path");
const { getEpisodeInfo } = require("./lib/SpotifyMethods");
const { getAppAccessToken } = require("./lib/SpotifyAccess");

const app = express();
const port = process.env.PORT || 3001;

app.get("/oauth/apptoken", async (request, response) => {
  const apptoken = await getAppAccessToken();
  response.send(apptoken);
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
