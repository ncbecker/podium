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

// Authorization Code Flow (Access Token can be refreshed with Refresh Token)

// User Access and Refresh Token

async function getUserAccessToken(authCode) {
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
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: process.env.REDIRECT_URI,
    }),
  });
  const data = await response.json();
  return data;
}

// Refresh User Access Token (with Refresh Token instead of Auth Code)

async function refreshUserAccessToken(refreshToken) {
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
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await response.json();
  return data;
}

exports.getAppAccessToken = getAppAccessToken;
exports.getUserAccessToken = getUserAccessToken;
exports.refreshUserAccessToken = refreshUserAccessToken;
