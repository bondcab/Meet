"use strict";

// Google API object
const { google } = require("googleapis");

// Google calendar API
const calendar = google.calendar("v3");

// Scope of access. Read Only
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// The values of client secret, client id and calendar id
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// Where Google OAuth2 will redirect after approval given
const redirect_uris = ["https://bondcab.github.io/Meet/"];

// Instance of OAuth2 class which uses Apps client ID, client secret and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// Lambda function which generates an authorization URL with the defined scopes. Should allow CORs access
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// Lambda function for getting the access token
module.exports.getAccessToken = async (event) => {
  // Takes the code from the URL after Google AuthO2 approval given
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  // Runs OAuth2 getToken method with the extracted code. If successful will return response with token
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },

        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
