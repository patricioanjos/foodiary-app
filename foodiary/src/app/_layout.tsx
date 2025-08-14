import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Bungee_400Regular, useFonts } from '@expo-google-fonts/bungee'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from "react";

import '../styles/global.css';

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({ Bungee_400Regular })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])


    return (
        <SafeAreaProvider>
            <Stack />
        </SafeAreaProvider>
    )
}