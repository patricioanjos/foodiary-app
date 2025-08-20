import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../utils/formatDate";

interface IDateSwitcherProps {
    currentDate: Date
    onPreviousDate(): void
    onNextDate(): void
}


export function DateSwitcher({currentDate, onPreviousDate, onNextDate}: IDateSwitcherProps) {
    return (
        <View className="flex-row justify-between items-center px-2 mt-3">
            <TouchableOpacity className="size-12 justify-center items-center" onPress={onPreviousDate}>
                <ChevronLeftIcon size={20} className="text-black-700"/>
            </TouchableOpacity>

            <Text className="font-sans-regular text-base text-gray-700 tracking-[1.28px]">
                {formatDate(currentDate)}
            </Text>

            <TouchableOpacity className="size-12 justify-center items-center" onPress={onNextDate}>
                <ChevronRightIcon size={20} className="text-black-700"/>
            </TouchableOpacity>
        </View>
    )
}