import { Stack } from "expo-router";
import { Bungee_400Regular, useFonts } from '@expo-google-fonts/bungee'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";

import '../styles/global.css';

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({ Bungee_400Regular })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if (!loaded && !error) {
        return null
    }

    const isLoggedIn = false

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} >
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(private)" />
                </Stack.Protected>

                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="(public)" />
                </Stack.Protected>
            </Stack>
        </SafeAreaProvider>
    )
}