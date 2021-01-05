require("dotenv").config();

const createDevUrl = () => {
  let devUrl = { authUrl: "/oauth/spotify/authorize", voteUrl: "/vote" };
  if (process.env.DEV_PROXY_URL) {
    devUrl.authUrl = "http://localhost:3001/oauth/spotify/authorize";
    devUrl.voteUrl = "http://localhost:3000/vote";
  }
  return devUrl;
};

exports.createDevUrl = createDevUrl;
