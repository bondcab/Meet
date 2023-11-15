import mockData from "./mock-data";

//  * This function takes an events array, then uses map to create a new array with only locations.
//  * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
//  * The Set will remove all duplicates from the array.

// Function to remove the query parameters
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// Function to send request to the Lambda getToken API endpoint with encoded code return from getAuthUrl response
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    "https://30661lpiv0.execute-api.eu-central-1.amazonaws.com/dev/api/token/" +
      encodeCode
  );

  const { access_Token } = await response.json();
  access_Token && localStorage.setItem("access_token", access_Token);

  return access_Token;
};

// Maps events and returns a list of locations. Uses Set so no duplicates
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// Takes accessToken as parameter then sends a fetch request to the Google OAuth server to confirm the validity of the token
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

//  This function will fetch the list of all events
export const getEvents = async () => {
  // If request is coming from localhost then mock data will be returned
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  // Result of the getAccessToken function which should be the access token from local storage
  const token = await getAccessToken();

  // there is a token in local storage then function executed
  if (token) {
    // removeQuery should remove query parameters from url
    removeQuery();

    // getEvents Lambda function api endpoint with added token
    const url = `https://30661lpiv0.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;

    // Response should be the result of Lambda getCalendarEvents function
    const response = await fetch(url);
    const result = await response.json();

    // If getCalendarEvents Lambda function returns json response then return the events from it otherwise return null
    if (result) {
      return result.events;
    } else return null;
  }
};

// getAccessToken function
export const getAccessToken = async () => {
  // Assigns token from local storage to variable - accessToken
  const accessToken = localStorage.getItem("access_token");

  // If there is an access token in local storage and its a valid token it value should return true
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // If there is no access token in local storage or the tokenCheck returns an error remove the access_token from local storage,
  if (!accessToken || tokenCheck.error) {
    localStorage.removeItem("access_token");
    // Checks parameters for code value
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    // If no code in the search parameters when will run the Lambda getAuth function
    if (!code) {
      const response = await fetch(
        "https://30661lpiv0.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );

      // Will take the authentication url returned from function and put in variable called authUrl and set URL to this
      // returning user to Google authentication window
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    // If code value is true then Lambda getToken funtion is run with encoded code which will set local storage access token
    return code && getToken(code);
  }
  // If there is an access token in local storage the function will return it
  return accessToken;
};
