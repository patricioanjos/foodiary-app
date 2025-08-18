import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import { Image, Modal, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Button } from "./Button"
import { CameraIcon, CheckIcon, Trash2Icon, XIcon } from "lucide-react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { useCreateMeal } from "../hooks/useCreateMeal"

interface ICameraModalProps {
    open: boolean
    onClose: () => void
}

export function CameraModal({ onClose, open }: ICameraModalProps) {
    const [photoUri, setPhotoUri] = useState<string | null>(null)
    const [permission, requestPermission] = useCameraPermissions()
    
    const cameraRef = useRef<CameraView>(null)
    const { createMeal } = useCreateMeal('image/jpg')

    async function handleTakePicture() {
        if (!cameraRef.current) {
            console.log('camera nao') 
            return
        }

        const { uri } = await cameraRef.current.takePictureAsync({ imageType: 'jpg' })

        setPhotoUri(uri)
        console.log(photoUri)
    }

    function handleCloseModal() {
        setPhotoUri(null)
        onClose()
    }

    function handleDeletePhoto() {
        setPhotoUri(null)
    }

    if (!permission) {
        return null
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
                {!permission.granted && (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-white text-center px-10 text-base font-sans-regular mb-4">
                            É preciso dar permissão para acessar a câmera
                        </Text>
                        <Button onPress={requestPermission}>
                            Dar permissão
                        </Button>
                    </View>
                )}


                {permission.granted && (
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1">
                            <View className="flex-row p-5">
                                <Button size="icon" color="dark" onPress={handleCloseModal}>
                                    <XIcon size={20} color="#D9D9D9" />
                                </Button>
                            </View>

                            {!photoUri && (
                                <CameraView style={{ flex: 1 }} />
                            )}

                            {photoUri && (
                                <Image source={{ uri: photoUri }} className="flex-1" resizeMode="contain" />
                            )}

                            {!photoUri && (
                                <View className="p-5 pt-6 pb-12 gap-2 items-center">
                                    <View className="flex-row">
                                        <Button size="icon" color="dark" onPress={handleTakePicture}>
                                            <CameraIcon size={20} color="#A2E635" />
                                        </Button>
                                    </View>

                                    <Text className="text-gray-100 text-base font-sans-regular">
                                        Tirar Foto
                                    </Text>
                                </View>
                            )}

                            {photoUri && (
                                <View className="flex-row justify-center items-center p-5 pt-6 pb-12 gap-8">
                                    <Button size="icon" color="dark" onPress={handleDeletePhoto}>
                                        <Trash2Icon size={20} color="#D9D9D9" />
                                    </Button>
                                    <Button size="icon" color="dark" onPress={() => createMeal(photoUri)}>
                                        <CheckIcon size={20} color="#18181B" />
                                    </Button>
                                </View>
                            )}
                        </SafeAreaView>
                    </SafeAreaProvider>
                )}
            </View>
        </Modal>
    )
}