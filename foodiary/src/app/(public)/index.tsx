import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";

export default function Page() {

    return (
        <SafeAreaView className="flex-1 bg-lime-700">
            <View className="flex-1 justify-between items-center">
                <View className="mx-auto mt-4">
                    <Text className="font-sans-regular text-2xl">Foodiary</Text>
                </View>

                <View className="w-full items-center">
                    <Text className="font-sans-regular text-[32px] text-white text-center w-[311px]">
                        Controle sua dieta de forma simples
                    </Text>

                    <View className="w-full mt-5 p-5">
                        <Link href={"/signup"} asChild>
                            <Button className="w-full">
                                Criar Conta
                            </Button>
                        </Link>

                        <View className="mt-[30px] flex-row justify-center items-center gap-2">
                            <Text className="text-white font-sans-regular text-base">
                                Já tem conta?
                            </Text>
                            <Link href={"/signin"}>
                                <Text className="text-lime-500 font-sans-regular text-base">
                                    Acesse agora!
                                </Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}