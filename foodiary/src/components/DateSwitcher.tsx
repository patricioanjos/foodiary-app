import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";


export function DateSwitcher() {
    return (
        <View className="flex-row justify-between items-center px-2 mt-3">
            <TouchableOpacity className="size-12 justify-center items-center">
                <ChevronLeftIcon size={20} className="text-black-700"/>
            </TouchableOpacity>

            <Text className="font-sans-regular text-base text-gray-700 tracking-[1.28px]">
                HOJE, 11 DE AGOSTO
            </Text>

            <TouchableOpacity className="size-12 justify-center items-center">
                <ChevronRightIcon size={20} className="text-black-700"/>
            </TouchableOpacity>
        </View>
    )
}