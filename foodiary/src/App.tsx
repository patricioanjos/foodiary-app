import { View } from 'react-native';
import { Bungee_400Regular, useFonts } from '@expo-google-fonts/bungee'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import './styles/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './screens/Home';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded, error] = useFonts({ Bungee_400Regular })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  return (
    <View className="flex-1">
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </View>
  );
}
