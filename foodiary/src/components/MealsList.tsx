import { FlatList, Text, View } from "react-native";
import { MealCard } from "./MealCard";
import { DateSwitcher } from "./DateSwitcher";
import { DailyStats } from "./DailyStats";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../services/httpClient";

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

type Meals = {
    id: string
    name: string
    icon: string
    foods: {
        name: string
        quantity: string
        calories: number
        proteins: number
        carbohydrates: number
        fats: number
    }[]
    createdAt: string
}

export function MealsList() {
    const { bottom } = useSafeAreaInsets()

    const {data: meals} = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const {data} = await httpClient.get<{meals: Meals[]}>('/meals', {
                params: {
                    date: '2025-08-18'
                }
            })

            return data.meals
        }
    })

    return (
        <FlatList
            data={meals}
            keyExtractor={meal => meal.id}
            ListHeaderComponent={MealsListHeader}
            ItemSeparatorComponent={Separator}
            ListEmptyComponent={<Text>Nenhuma refeição cadastrada</Text>}
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