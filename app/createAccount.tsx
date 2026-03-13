import React, { useState } from "react";
import { Button, Text, TextInput, View } from 'react-native';
import { signInAndGetToken } from "./services/getToken";
import { createSheetIfNotExists } from "./services/googleSheet";
import { ThemeProvider } from "./context/ThemeContext";

export default function createAccount() {
  const [projectName, setProjectName] = useState("");

  const handleCreate = async (e: any) => {
    e.preventDefault();
    var Token = await signInAndGetToken();
    await handleLoginSuccess(Token);

  };

  const handleLoginSuccess = async (accessToken: string) => {
    try {
      const sheetId = await createSheetIfNotExists(
        accessToken,
        projectName
      );

      console.log("Spreadsheet ID:", sheetId);
    } catch (error) {
      console.error("Sheet error:", error);
    }

  };

  return (
    <ThemeProvider>
        <Text >Sign In</Text>
        <View >
          <Text>Project Name</Text>
          <TextInput placeholder="Enter your project name" value={projectName}
            onChangeText={(text) => setProjectName(text)} />
         </View>

        <Button title="Create" onPress={handleCreate} />
    </ThemeProvider>

  );
}