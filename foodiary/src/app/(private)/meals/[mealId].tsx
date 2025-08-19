import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "../../../components/Button";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../services/httpClient";

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
        queryKey: ['meal'],
        queryFn: async () => {
            const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`)

            return data.meal
        },

        refetchInterval: (query) => {
            if (query.state.data?.status !== 'success') {
                return 2000
            }
        }
    })

    if (isFetching || meal?.status !== 'success') {
        return (
            <View className="flex-1 justify-center items-center gap-12 bg-lime-700">
                <Text className="text-white font-sans-regular text-4xl">Foodiary</Text>
                <ActivityIndicator color={"#FFF"} />
            </View>
        )
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Text>{JSON.stringify(meal, null, 2)}</Text>

            <Button onPress={router.back}>
                Voltar
            </Button>
        </View>
    )
}