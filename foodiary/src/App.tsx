import { View } from 'react-native';
import { Bungee_400Regular, useFonts } from '@expo-google-fonts/bungee'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import './styles/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from './components/HomeHeader';
import { DateSwitcher } from './components/DateSwitcher';
import { DailyStats } from './components/DailyStats';
import { MealsList } from './components/MealsList';

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
        <HomeHeader />
        <DateSwitcher />
        <View className="mt-2">
          <DailyStats 
          calories={{current: 500, goal: 2500}}
          proteins={{current: 500, goal: 2500}}
          carbohydrates={{current: 500, goal: 2500}}
          fats={{current: 500, goal: 2500}}
        />
        </View>

        <View className='h-px bg-gray-200 mt-7' />

        <MealsList/>
      </SafeAreaProvider>
    </View>
  );
}
