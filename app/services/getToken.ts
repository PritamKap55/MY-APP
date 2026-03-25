import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ],
  webClientId: '470784951477-eph9euapeqjpsrelohp5p6eq2jvbluo0.apps.googleusercontent.com',
  offlineAccess: true,
});


export const signInAndGetToken = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    await GoogleSignin.signIn();

    const tokens = await GoogleSignin.getTokens();
    const accessToken = tokens?.accessToken;

    return accessToken;

  } catch (error: any) {


    return error;
  }
};