import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "./context/ThemeContext";
import { signInAndGetToken } from "./services/getToken";

type FileType = {
  id: string;
  name: string;
};

export default function SheetListScreen({  }: any) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [error, setRrror] = useState<string>("ok");

  useEffect(() => {

    loadSheets();
  }, []);

  const loadSheets = async () => {
     var Token = await signInAndGetToken();
     setRrror(Token.toString());
    //  if (Token != null)
    //  {
    //     const result = await searchAccount(Token);
    //     setFiles(result);
    //  }
    
  };

  // const shareSheet = async (sheetId: string) => {
  //    var Token = await signInAndGetToken();

  //       await axios.post(
  //     `https://www.googleapis.com/drive/v3/files/${sheetId}/permissions`,
  //     {
  //       role: "reader",
  //       type: "anyone"
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${Token}`,
  //       },
  //     }
  //   );
  // };

 const renderItem = ({ item }: { item: FileType }) => (
    <View>
      
      {/* Navigate to Details */}
      <Pressable
        style={styles.item}
        onPress={() =>
          router.push({
            pathname: "/viewAccount",
            params: { id: item.id }
          } as any)
        }
      >
        <Text style={styles.text}>{item.name}</Text>
      </Pressable>

      {/* Share Button */}
      <Pressable
        style={styles.shareBtn}
        // onPress={() => shareSheet(item.id)}
      >
        <Text style={styles.shareText}>Share</Text>
      </Pressable>

    </View>
  );

  return (
    <ThemeProvider>
      
        <Text style={styles.title}>My Google Sheets</Text>
        <Text style={styles.title}>{error}</Text>

        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
   
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
 
  title: {
    fontSize: 22,
    marginBottom: 20,
    marginTop:50,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  id: {
    fontSize: 12,
    color: "gray",
  }, shareBtn: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },

  shareText: {
    color: "white",
    fontWeight: "bold",
  },
});