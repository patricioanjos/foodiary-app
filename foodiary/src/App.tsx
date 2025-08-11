import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {Bungee_400Regular, useFonts} from '@expo-google-fonts/bungee'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import './styles/global.css';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded, error] = useFonts({Bungee_400Regular})

  useEffect(() => {
    if(loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-sans-regular">Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
