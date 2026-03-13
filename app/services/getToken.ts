import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ],
  webClientId: '470784951477-1mcdh3c1puclmb9ttot8mchl3onvsshb.apps.googleusercontent.com',
  offlineAccess: true,
});

export const signInAndGetToken = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  await GoogleSignin.signIn();

  const { accessToken } = await GoogleSignin.getTokens();

  return accessToken;
};