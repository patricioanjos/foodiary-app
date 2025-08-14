import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface IMealProps {
    id: string
    name: string
}

export function MealCard({ name, id }: IMealProps) {
    return (
        <Link href={`/meals/${id}`} asChild>
            <TouchableOpacity>
                <Text className="font-sans-regular text-gray-700">
                    Hoje, 09:00
                </Text>

                <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border border-gray-400 rounded-2xl">
                    <View className="size-12 bg-gray-200 rounded-full justify-center items-center">
                        <Text>🔥</Text>
                    </View>

                    <View>
                        <Text className="font-sans-regular text-gray-700">{name}</Text>
                        <Text className="font-sans-regular text-black-700">Pão e ovo</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}