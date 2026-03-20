import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeProvider } from "./context/ThemeContext";
import { signInAndGetToken } from "./services/getToken";

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ],
  webClientId: '470784951477-1mcdh3c1puclmb9ttot8mchl3onvsshb.apps.googleusercontent.com',
  
  offlineAccess: true,
  
});

const addData = async (accessToken:string, spreadsheetId:string) => {
  await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=RAW`,
    {
      values: [
        ['Name', 'Email'],
        ['Pritam', 'pritam@email.com']
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export default function Login() {
  const [data, setData] = useState<any>(null);
  const [token,setToken] = useState<String>("");
  const [sheetId,setSheetId] = useState<String>("");
  const [bgColor, setBgColor] = useState('#ffffff');
  const router = useRouter();

  const changeColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setBgColor(randomColor);
  };

      const loginApi = async () => {

        try
        {
            var Token = await  signInAndGetToken();
            if (Token != null)
     {
            setToken(Token);
     }
            //var SheetId = await createSheet(Token);
            //setSheetId(SheetId)
            //addData(Token,SheetId);
         }
        catch (error) {
        alert(error);
      }
      
    };
  
  const handleSubmit = async  (e: any) => {
    e.preventDefault();
    router.push('/accounts' as any);
  };


  const handleCreateAccount = async  (e: any) => {
    router.push('/createAccount' as any);
  };


  return (
      <ThemeProvider>
        <Image source={{ uri: "https://nerolaclms.com/images/logo.png" }} style={{ width: "100%", height: 150 }}/>
        <Text style={styles.subtitle}>Sign In</Text>
        <View style={styles.formGroup}>
           <Text>Username</Text>
            <TextInput placeholder="Enter your User name" style={styles.input} />
        </View>
        <View style={styles.formGroup}>
           <Text>Username</Text>
            <TextInput placeholder="Enter your password" style={styles.input} />
        </View>
        <Button title="Login" onPress={handleSubmit} />

      <Text style={styles.subtitle}>{token}</Text>
      <Text style={styles.subtitle}>{sheetId}</Text>
      <Button title="Create Account" onPress={handleCreateAccount} />

     </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e3c72", // gradient not supported directly
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 40,
    borderRadius: 12,
    width: 350,
    elevation: 5, // shadow for Android
  },
  brand: {
    marginBottom: 5,
    fontSize: 28,
    fontWeight: "bold",
    color: "#2a5298",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 25,
    color: "#555",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
  },
  loginBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#e7004c",
    marginTop: 10,
  },
  loginBtnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    marginTop: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#2a5298",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
  },
});