const { collection } = require("./database");

// FIND

async function getSingleEpisode(id) {
  const singleEpisode = await collection("episodes").findOne({
    episodeID: id,
  });
  return singleEpisode;
}

async function getAllEpisodes() {
  const allEpisodes = await collection("episodes").find({}).toArray();
  return allEpisodes;
}

async function getSingleUser(id) {
  const singleUser = await collection("users").findOne({ spotifyUserID: id });
  return singleUser;
}

async function getAllUsers() {
  const allUsers = await collection("users").find({}).toArray();
  return allUsers;
}

exports.getSingleEpisode = getSingleEpisode;
exports.getAllEpisodes = getAllEpisodes;
exports.getSingleUser = getSingleUser;
exports.getAllUsers = getAllUsers;
