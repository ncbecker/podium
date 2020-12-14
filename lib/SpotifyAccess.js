require("dotenv").config();
const fetch = require("node-fetch");

// Client Credentials Flow (Access Token valid for 3600s)

async function getAppAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data;
}

exports.getAppAccessToken = getAppAccessToken;
