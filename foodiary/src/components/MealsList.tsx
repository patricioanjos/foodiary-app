import { FlatList, Text, View } from "react-native";
import { MealCard } from "./MealCard";
import { DateSwitcher } from "./DateSwitcher";
import { DailyStats } from "./DailyStats";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../services/httpClient";
import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "expo-router";

interface IDateSwitcherProps {
    currentDate: Date
    meals: Meal[]
    onPreviousDate(): void
    onNextDate(): void
}

function MealsListHeader({ currentDate, meals, onPreviousDate, onNextDate }: IDateSwitcherProps) {
    const { user } = useAuth()

    const totals = useMemo(() => {
        let calories = 0
        let proteins = 0
        let carbohydrates = 0
        let fats = 0

        for (const meal of meals) {
            for (const food of meal.foods) {
                calories += food.calories
                proteins += food.proteins
                carbohydrates += food.carbohydrates
                fats += food.fats
            }
        }

        return { calories, proteins, carbohydrates, fats }
    }, [meals])

    return (
        <View>
            <DateSwitcher currentDate={currentDate} onPreviousDate={onPreviousDate} onNextDate={onNextDate} />

            <View className="mt-2">
                <DailyStats
                    calories={{ current: totals.calories, goal: user!.calories }}
                    proteins={{ current: totals.proteins, goal: user!.proteins }}
                    carbohydrates={{ current: totals.carbohydrates, goal: user!.carbohydrates }}
                    fats={{ current: totals.fats, goal: user!.fats }}
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

type Meal = {
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
    const [currentDate, setCurrentData] = useState(new Date())

    const dateParam = useMemo(() => {
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const day = String(currentDate.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }, [currentDate])

    const { data: meals, refetch } = useQuery({
        queryKey: ['meals', dateParam],
        staleTime: 10_000,
        queryFn: async () => {
            const { data } = await httpClient.get<{ meals: Meal[] }>('/meals', {
                params: {
                    date: dateParam
                }
            })

            return data.meals
        }
    })

    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [refetch])
    )

    function handlePreviousDate() {
        setCurrentData(prevState => {
            const newDate = new Date(prevState)
            newDate.setDate(newDate.getDate() - 1)

            return newDate
        })
    }

    function handleNextDate() {
        setCurrentData(prevState => {
            const newDate = new Date(prevState)
            newDate.setDate(newDate.getDate() + 1)

            return newDate
        })
    }

    return (
        <FlatList
            data={meals}
            keyExtractor={meal => meal.id}
            ItemSeparatorComponent={Separator}
            ListEmptyComponent={<Text>Nenhuma refeição cadastrada</Text>}
            contentContainerStyle={{ paddingBottom: bottom }}
            ListHeaderComponent={(
                <MealsListHeader
                    currentDate={currentDate}
                    meals={meals ?? []}
                    onPreviousDate={handlePreviousDate}
                    onNextDate={handleNextDate}
                />
            )}
            renderItem={({ item }) => (
                <View className="mx-5">
                    <MealCard
                        id={item.id}
                        name={item.name}
                        icon={item.icon}
                        foods={item.foods}
                        createdAt={new Date(item.createdAt)}
                    />
                </View>
            )}
        />
    )
}