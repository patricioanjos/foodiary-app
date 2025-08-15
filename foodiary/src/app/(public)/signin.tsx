import { Text, View } from "react-native";
import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";

export default function SignIn() {
    return (
        <AuthLayout icon="👤" title="Entre em sua conta" subtitle="Acesse sua conta para continuar">
            <View className="flex-1 justify-between">
                <View className="gap-6">
                    <Input
                        label="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                    />

                    <Input
                        label="Senha"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        secureTextEntry
                    />
                </View>

                <View className="flex-row gap-6">
                    <Button size="icon" color="gray" onPress={router.back}>
                        <ArrowLeftIcon size={20} color={"#18181B"} />
                    </Button>
                    <Button className="flex-1">
                        Entrar
                    </Button>
                </View>
            </View>
        </AuthLayout>
    )
}