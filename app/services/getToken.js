import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ],
  webClientId: "417059671592-8hpg94oqiohctu16phppadvgpcl7b2rj.apps.googleusercontent.com",
	androidClientId: "417059671592-eti1v5u7o33n01m49b1o606cjm28m31s.apps.googleusercontent.com",
  offlineAccess: true,
});


export const signInAndGetToken = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    await GoogleSignin.signIn();

    const tokens = await GoogleSignin.getTokens();
    const accessToken = tokens?.accessToken;

    return accessToken;

  } catch (error) {


    return error;
  }
};