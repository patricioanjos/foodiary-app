import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { formatMealDate } from "../utils/formateMealDate";

interface IMealProps {
    id: string
    name: string
    icon: string
    createdAt: Date
    foods: {
        name: string
    }[]
}

export function MealCard({ id, name, icon, createdAt, foods  }: IMealProps) {
    return (
        <Link href={`/meals/${id}`} asChild>
            <TouchableOpacity>
                <Text className="font-sans-regular text-gray-700">
                    {formatMealDate(createdAt)}
                </Text>

                <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border border-gray-400 rounded-2xl">
                    <View className="size-12 bg-gray-200 rounded-full justify-center items-center">
                        <Text>{icon}</Text>
                    </View>

                    <View className="flex-1">
                        <Text className="font-sans-regular text-gray-700">{name}</Text>
                        <Text className="font-sans-regular text-black-700">
                            {foods.map(({name}) => name).join(', ')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}