import { FlatList, Text, View } from "react-native";
import { MealCard } from "./MealCard";
import { DateSwitcher } from "./DateSwitcher";
import { DailyStats } from "./DailyStats";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";

const meals = [
    {
        id: String(Math.random()),
        name: 'Café da manhã'
    },
    {
        id: String(Math.random()),
        name: 'Almoço'
    },
    {
        id: String(Math.random()),
        name: 'Café da Tarde'
    },
    {
        id: String(Math.random()),
        name: 'Janta'
    }
]

function MealsListHeader() {
    const { user } = useAuth()
    return (
        <View>
            <DateSwitcher />

            <View className="mt-2">
                <DailyStats
                    calories={{ current: 0, goal: user!.calories }}
                    proteins={{ current: 0, goal: user!.proteins }}
                    carbohydrates={{ current: 0, goal: user!.carbohydrates }}
                    fats={{ current: 0, goal: user!.fats }}
                />
            </View>

            <View className='h-px bg-gray-200 mt-7' />

            <Text className="text-black-700 m-5 text-base font-sans-regular tracking-[1.28px]">
                Refeições
            </Text>
        </View>
    )
}

function Separator() {
    return (
        <View className="h-8" />
    )
}

export function MealsList() {
    const { bottom } = useSafeAreaInsets()

    return (
        <FlatList
            data={meals}
            keyExtractor={meal => meal.id}
            ListHeaderComponent={MealsListHeader}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={{ paddingBottom: bottom }}
            renderItem={({ item }) => (
                <View className="mx-5">
                    <MealCard
                        id={item.id}
                        name={item.name}
                    />
                </View>
            )}
        />
    )
}