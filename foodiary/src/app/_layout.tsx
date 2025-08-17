import { Stack } from "expo-router";
import { Bungee_400Regular, useFonts } from '@expo-google-fonts/bungee'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";

import '../styles/global.css';
import { AuthProvider } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function Layout() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RootLayout />
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}

function RootLayout() {
    const [loaded, error] = useFonts({ Bungee_400Regular })
    const { isLoggedIn, isLoading } = useAuth()

    useEffect(() => {
        const isFontLoaded = loaded || error
        const isUserLoaded = !isLoading

        if (isFontLoaded && isUserLoaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error, isLoading])

    if (!loaded && !error) {
        return null
    }

    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(private)" />
            </Stack.Protected>

            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="(public)" />
            </Stack.Protected>
        </Stack>
    )
}