import { ThemedView } from '@/components/themed-view';
import React, { ReactNode, useState } from "react";
import { Pressable } from 'react-native';



export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [bgColor, setBgColor] = useState("#ffffff");

    const changeColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setBgColor(randomColor);
    };

    return (
        <Pressable style={{ flex: 1 }} onPress={changeColor}>
            <ThemedView style={[{ flex: 1, justifyContent: "center", alignItems: "center", }, { backgroundColor: bgColor }]}>
                {children}
            </ThemedView>
        </Pressable>
    );
};

