import { LogOutIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";

export default function HomeHeader() {
    const { signOut } = useAuth()

    return (
        <View className="bg-lime-400 h-[130px]">
            <SafeAreaView className=" px-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-gray-700 font-sans-regular">Olá,</Text>
                    <Text className="text-black-700 text-base font-sans-regular">Usuário</Text>
                </View>

                <TouchableOpacity className="size-12 justify-center items-center" onPress={signOut}>
                    <LogOutIcon size={20} className="text-black-700" />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}