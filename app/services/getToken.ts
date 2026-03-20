import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ],
  webClientId: '470784951477-1mcdh3c1puclmb9ttot8mchl3onvsshb.apps.googleusercontent.com',
  offlineAccess: true,
});


export const signInAndGetToken = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    await GoogleSignin.signIn();

    const tokens = await GoogleSignin.getTokens();
    const accessToken = tokens?.accessToken;

    if (!accessToken) {
      Alert.alert("Error", "No access token received");
      return null;
    }

    Alert.alert("Success", "Access Token Received");

    return accessToken;

  } catch (error: any) {
   
    Alert.alert("Login Error", error);

    return null;
  }
};