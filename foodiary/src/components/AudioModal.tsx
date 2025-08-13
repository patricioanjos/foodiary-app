import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Modal, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Button } from "./Button"
import { CheckIcon, MicIcon, PauseIcon, PlayIcon, SquareIcon, Trash2Icon, XIcon } from "lucide-react-native"
import { cn } from "../utils/cn"

interface IAudioModalProps {
    open: boolean
    onClose: () => void
}

export function AudioModal({ onClose, open }: IAudioModalProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [audioUri, setAudioUri] = useState<null | string>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    function handleStartRecording() {
        setIsRecording(true)
    }

    function handleStopRecording() {
        setIsRecording(false)
        setAudioUri('audio-uri')
    }

    function handlePlay() {
        setIsPlaying(true)
    }

    function handlePause() {
        setIsPlaying(false)
    }

    function handleDeleteAudio() {
        setAudioUri(null)
        setIsPlaying(false)
    }

    function handleCloseModal() {
        setAudioUri(null)
        setIsPlaying(false)
        setIsPlaying(false)
        onClose()
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            onRequestClose={handleCloseModal}
            visible={open}
            animationType="slide"
        >
            <StatusBar style="light" />

            <View className="bg-black flex-1">
                <SafeAreaProvider>
                    <SafeAreaView className="flex-1">
                        <View className="flex-row p-5">
                            <Button size="icon" color="dark" onPress={handleCloseModal}>
                                <XIcon size={20} color={'#D9D9D9'} />
                            </Button>
                        </View>

                        <View className="flex-1 justify-center items-center">
                            <View className="size-[256px] border border-gray-700/10 rounded-full justify-center items-center">
                                <View className={cn(
                                    'size-[227px] border border-gray-700/50 rounded-full justify-center items-center',
                                    isRecording && 'border-lime-600/50'
                                )}>
                                    <View className={cn(
                                        'size-[179px] bg-gray-700/10 rounded-full',
                                        isRecording && 'bg-lime-600/10'
                                    )} />
                                </View>
                            </View>

                            <Text className="text-white text-base text-center font-sans-regular w-[192px] mt-8">
                                Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
                            </Text>
                        </View>

                        {!audioUri && (
                            <View className="p-5 pt-6 items-center gap-2 pb-20">
                                <View className="flex-row">
                                    {!isRecording && (
                                        <Button size="icon" color="dark" onPress={handleStartRecording}>
                                            <MicIcon size={20} color={'#A2E635'} />
                                        </Button>
                                    )}

                                    {isRecording && (
                                        <Button size="icon" color="dark" onPress={handleStopRecording}>
                                            <SquareIcon size={20} color={'#D9D9D9'} />
                                        </Button>
                                    )}
                                </View>

                                <Text className="text-gray-100 text-base text-center font-sans-regular w-[180px]">
                                    Toque no microfone para começar a gravar
                                </Text>
                            </View>
                        )}

                        {audioUri && (
                            <View className="p-5 pt-6 pb-20 flex-row justify-center items-center gap-8">
                                <Button size="icon" color="dark" onPress={handleDeleteAudio}>
                                    <Trash2Icon size={20} color={'#D9D9D9'} />
                                </Button>


                                {!isPlaying && (
                                    <Button size="icon" color="dark" onPress={handlePlay}>
                                        <PlayIcon size={20} color={'#A2E635'} />
                                    </Button>
                                )}

                                {isPlaying && (
                                    <Button size="icon" color="dark" onPress={handlePause}>
                                        <PauseIcon size={20} color={'#D9D9D9'} />
                                    </Button>
                                )}

                                <Button size="icon">
                                    <CheckIcon size={20} color={'#71717A'} />
                                </Button>
                            </View>
                        )}
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </Modal>
    )
}