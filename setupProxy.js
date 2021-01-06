require("dotenv").config();

const createDevUrl = () => {
  let devUrl = { auth: "/oauth/spotify/authorize", vote: "/vote" };
  if (process.env.DEV_PROXY_URL) {
    devUrl.auth = "http://localhost:3001/oauth/spotify/authorize";
    devUrl.vote = "http://localhost:3000/vote";
  }
  return devUrl;
};

exports.createDevUrl = createDevUrl;
