const { collection } = require("./database");

// CREATE

async function setUser(id, name) {
  await collection("users").insertOne({
    _id: id,
    spotifyDisplayName: name,
  });
}

async function setEpisode(id, userId) {
  await collection("episodes").insertOne({
    _id: id,
    users: [userId],
    likes: 1,
  });
}

// READ

async function getSingleEpisode(id) {
  const singleEpisode = await collection("episodes").findOne({
    _id: id,
  });
  return singleEpisode;
}

async function getAllEpisodes() {
  const allEpisodes = await collection("episodes")
    .find({})
    .sort(["likes", -1])
    .toArray();
  return allEpisodes;
}

async function getPaginatedEpisodes(skip) {
  const limit = 10;
  const skipInt = parseInt(skip);
  let nextSkip = null;
  const episodeCount = await collection("episodes").countDocuments();
  if (skipInt + limit >= episodeCount) {
    nextSkip = null;
  } else {
    nextSkip = skipInt + limit;
  }
  const paginatedEpisodes = await collection("episodes")
    .find({})
    .sort({ likes: -1, _id: -1 })
    .skip(skipInt)
    .limit(limit)
    .toArray();
  return [paginatedEpisodes, nextSkip];
}

async function getAllLikedEpisodes(id) {
  const allLikedEpisodes = await collection("episodes")
    .aggregate([{ $match: { users: id } }, { $sort: { likes: -1 } }])
    .toArray();
  return allLikedEpisodes;
}

async function getSingleUser(id) {
  const singleUser = await collection("users").findOne({ _id: id });
  return singleUser;
}

async function getAllUsers() {
  const allUsers = await collection("users").find({}).toArray();
  return allUsers;
}

// UPDATE

async function updateUserDisplayName(id, name) {
  await collection("users").updateOne(
    { _id: id },
    { $set: { spotifyDisplayName: name } }
  );
}

async function updateEpisodeLiked(id, userId) {
  await collection("episodes").updateOne(
    { _id: id },
    { $addToSet: { users: userId }, $inc: { likes: 1 } }
  );
}

async function updateEpisodeUnliked(id, userId) {
  await collection("episodes").updateOne(
    { _id: id },
    { $pull: { users: userId }, $inc: { likes: -1 } }
  );
}

// DELETE

async function deleteEpisode(id) {
  return await collection("episodes").deleteOne({
    _id: id,
  });
}

async function deleteManyEpisodes() {
  return await collection("episodes").deleteMany({
    likes: { $lte: 0 },
  });
}

exports.setUser = setUser;
exports.setEpisode = setEpisode;
exports.getSingleEpisode = getSingleEpisode;
exports.getAllEpisodes = getAllEpisodes;
exports.getPaginatedEpisodes = getPaginatedEpisodes;
exports.getAllLikedEpisodes = getAllLikedEpisodes;
exports.getSingleUser = getSingleUser;
exports.getAllUsers = getAllUsers;
exports.updateUserDisplayName = updateUserDisplayName;
exports.updateEpisodeLiked = updateEpisodeLiked;
exports.updateEpisodeUnliked = updateEpisodeUnliked;
exports.deleteEpisode = deleteEpisode;
exports.deleteManyEpisodes = deleteManyEpisodes;
