import { Text, View } from "react-native";
import { Button } from "./Button";
import { CameraIcon, MicIcon } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function MealBottomBar() {
    const { bottom } = useSafeAreaInsets()
    return (
        <View
            className="sticky bg-white z-10 w-full h-20 bottom-0 border-t border-gray-400"
            style={{ marginBottom: bottom }}
        >

            <View className="flex-row justify-center gap-4 mt-4">
                <Button size="icon" color="gray">
                    <MicIcon />
                </Button>

                <Button size="icon" color="gray">
                    <CameraIcon />
                </Button>
            </View>
        </View>
    )
}