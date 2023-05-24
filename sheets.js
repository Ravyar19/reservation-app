const { google } = require("googleapis");
const { auth } = require("google-auth-library");

// Load the service account credentials from the JSON file
const serviceAccount = require("./credentials.json");

// Create a new JWT client that uses the service account credentials
const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Authorize the JWT client and initialize the Google Sheets API client
const sheets = google.sheets({
  version: "v4",
  auth: jwtClient,
});

async function getSheetValues(range) {
  const spreadsheetId = "1QXf8JSNgqEY-dcpdPih5Co7sNXE0X4W30vZ8RwSfAMY";

  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return data.values;
}

async function updateSheetValues(range, values) {
  console.log(`Updating sheet values: Range: ${range}, Values:`, values);

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: "1QXf8JSNgqEY-dcpdPih5Co7sNXE0X4W30vZ8RwSfAMY",
    range,
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });

  console.log("Update sheet response:", response.data);
  return response.data;
}

module.exports = { getSheetValues, updateSheetValues };
