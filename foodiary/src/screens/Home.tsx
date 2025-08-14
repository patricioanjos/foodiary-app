import { View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import { MealsList } from "../components/MealsList";
import { MealBottomBar } from "../components/MealBottomBar";

export function Home() {
    return (
        <View className="flex-1">
            <HomeHeader />
            <MealsList />

            <MealBottomBar />
        </View>
    )
}