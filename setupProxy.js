require("dotenv").config();

const createDevUrl = () => {
  let devUrl = { auth: "/oauth/spotify/authorize", vote: "/vote" };
  if (process.env.DEV_PROXY_URL === "dev") {
    devUrl.auth = "http://localhost:3001/oauth/spotify/authorize";
    devUrl.vote = "http://localhost:3000/vote";
  }
  console.log({ devUrl });
  return devUrl;
};

exports.createDevUrl = createDevUrl;
