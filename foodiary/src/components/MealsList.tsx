import { FlatList, Text, View } from "react-native";
import { MealCard } from "./MealCard";
import { DateSwitcher } from "./DateSwitcher";
import { DailyStats } from "./DailyStats";

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
    return (
        <View>
            <DateSwitcher />

            <View className="mt-2">
                <DailyStats
                    calories={{ current: 500, goal: 2500 }}
                    proteins={{ current: 500, goal: 2500 }}
                    carbohydrates={{ current: 500, goal: 2500 }}
                    fats={{ current: 500, goal: 2500 }}
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
    return (
        <FlatList
            data={meals}
            keyExtractor={meal => meal.id}
            ListHeaderComponent={MealsListHeader}
            ItemSeparatorComponent={Separator}
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