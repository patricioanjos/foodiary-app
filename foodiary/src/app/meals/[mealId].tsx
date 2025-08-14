import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";

export default function MealsDetails() {
    const { mealId } = useLocalSearchParams()

    return (
        <View className="flex-1 justify-center items-center">
            <Text>Detalhes da refeição: {mealId}</Text>

            <Button onPress={router.back}>
                Voltar
            </Button>
        </View>
    )
}