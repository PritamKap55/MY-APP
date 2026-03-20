import axios from "axios";
import { Alert } from 'react-native';

export const createSheetIfNotExists = async (
  accessToken: string,
  name: string
): Promise<string> => {
  try {

    name="PKapp"+name;
    // 1️⃣ Check if sheet already exists using Google Drive API
    const searchResponse = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: `name='${name}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
          fields: "files(id, name)",
        },
      }
    );

    const files = searchResponse.data.files;

    // 2️⃣ If exists return existing ID
    if (files && files.length > 0) {
      Alert.alert("Account already exists");

      return files[0].id;
    }

    // 3️⃣ Create new sheet
    const createResponse = await axios.post(
      "https://sheets.googleapis.com/v4/spreadsheets",
      {
        properties: {
          title: name,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    Alert.alert("New Account created successfully");


    return createResponse.data.spreadsheetId;
  } catch (error: any) {
    console.error("Error creating sheet:", error.response?.data || error);
    throw error;
  }
};

export const searchAccount = async (accessToken: string) => {
  try {
    const searchResponse = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: `name contains 'PKapp' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
          fields: "files(id, name)",
        },
      }
    );

    const files = searchResponse.data.files || [];
    Alert.alert("Success", "files Received");
    return files;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};
