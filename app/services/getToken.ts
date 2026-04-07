
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ],
  webClientId: '470784951477-lcma97i0v0s5uckjmf6edl6lo96kb8b0.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
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