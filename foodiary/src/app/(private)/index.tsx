import { View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { MealsList } from "../../components/MealsList";
import { MealBottomBar } from "../../components/MealBottomBar";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      <HomeHeader />
      <MealsList />

      <MealBottomBar />
    </View>
  );
}