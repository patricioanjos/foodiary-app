import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../services/httpClient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "lucide-react-native";
import { Button } from "../../../components/Button";

type Meal = {
    id: string,
    name: string
    icon: string
    status: 'uploading' | 'processing' | 'success' | 'failed'
    createdAt: string
    foods: {
        name: string
        quantity: string
        calories: number
        proteins: number
        carbohydrates: number
        fats: number
    }[]
}

export default function MealsDetails() {
    const { mealId } = useLocalSearchParams()

    const { data: meal, isFetching } = useQuery({
        queryKey: ['meal', mealId],
        staleTime: 15_000,
        queryFn: async () => {
            const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`)

            return data.meal
        },

        refetchInterval: (query) => {
            if (query.state.data?.status === 'success' || query.state.data?.status === 'failed') {
                return false;
            }

            return 2_000;
        },
    })

    const calculateMacroTotals = () => {
        let calories = 0
        let proteins = 0
        let carbohydrates = 0
        let fats = 0

        if (!meal) { return }

        for (const food of meal.foods) {
            calories += food.calories
            proteins += food.proteins
            carbohydrates += food.carbohydrates
            fats += food.fats
        }

        return { calories, proteins, carbohydrates, fats }
    }

    const calculateMacroPercentage = () => {
        const { proteins = 0, carbohydrates = 0, fats = 0 } = calculateMacroTotals() || {}

        const totalGrams = proteins + carbohydrates + fats

        if (totalGrams === 0) {
            return {
                proteins: 0,
                carbohydrates: 0,
                fats: 0
            }
        }

        const proteinsPercent = (proteins / totalGrams) * 100
        const carbohydratesPercent = (carbohydrates / totalGrams) * 100
        const fatsPercent = (fats / totalGrams) * 100

        return {
            proteins: Math.round(proteinsPercent),
            carbohydrates: Math.round(carbohydratesPercent),
            fats: Math.round(fatsPercent)
        }
    }

    if (isFetching || meal?.status === 'uploading' || meal?.status === 'processing') {
        return (
            <View className="flex-1 justify-center items-center gap-12 bg-lime-700">
                <Text className="text-white font-sans-regular text-4xl">Foodiary</Text>
                <ActivityIndicator color={"#FFF"} />
            </View>
        )
    }

    if (meal?.status === 'failed') {
        return (
            <View className="flex-1 justify-center items-center gap-2">
                <Text>Erro ao processar refeição. Tente novamente</Text>
                <Button onPress={router.back}>Voltar</Button>
            </View>
        )
    }

    return (
        <>
            <View className="bg-lime-400 h-[130px]" >
                <SafeAreaView className="flex-row items-end justify-between h-full mx-2">
                    <TouchableOpacity className="flex-row items-center gap-4" onPress={router.back}>
                        <ChevronLeftIcon size={20} />
                        <Text className="font-sans-regular text-sm">Macros Totais</Text>
                    </TouchableOpacity>

                    <Text className="mr-2 font-sans-regular text-sm">Calorias: {calculateMacroTotals()?.calories}Kcal</Text>
                </SafeAreaView>
            </View>

            <SafeAreaView className="flex-1 mx-5">
                <View className="flex-row justify-between w-full">
                    <View>
                        <Text className="text-gray-700 font-sans-regular">Carboidrato</Text>
                        <Text className="text-support-yellow font-sans-regular text-center text-base">
                            {calculateMacroTotals()?.carbohydrates}g ({calculateMacroPercentage().carbohydrates}%)
                        </Text>
                    </View>
                    <View>
                        <Text className="text-gray-700 font-sans-regular">Proteína</Text>
                        <Text className="text-support-teal font-sans-regular text-center text-base">
                            {calculateMacroTotals()?.proteins}g ({calculateMacroPercentage().proteins}%)
                        </Text>
                    </View>
                    <View>
                        <Text className="text-gray-700 font-sans-regular">Gordura</Text>
                        <Text className="text-support-orange font-sans-regular text-center text-base">
                            {calculateMacroTotals()?.fats}g ({calculateMacroPercentage().fats}%)
                        </Text>
                    </View>
                </View>

                <View className="h-px bg-gray-500 mt-7 mb-14" />

                <View>
                    <Text className="font-sans-regular text-xl">
                        {meal?.name}
                    </Text>

                    <Text className="text-gray-700 font-sans-regular mt-6">Itens</Text>

                    {meal?.foods.map(({ name, quantity }) => (
                        <View key={name}>
                            <Text className="font-sans-regular">{quantity} {name}</Text>
                            <View className="h-px bg-gray-500 mt-1 mb-4" />
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </>
    )
}