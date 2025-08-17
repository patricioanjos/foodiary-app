import { Alert, View } from "react-native";
import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
    email: z.email('Informe um email válido'),
    password: z.string().min(8, 'Minímo de 8 caracteres')
})

export default function SignIn() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { signIn } = useAuth()

    const handleSubmit = form.handleSubmit(async (formData) => {
        try {
            await signIn(formData)
        } catch (error) {
            console.log(error)
            Alert.alert('Credenciais inválidas')
        }
    })

    return (
        <AuthLayout icon="👤" title="Entre em sua conta" subtitle="Acesse sua conta para continuar">
            <View className="flex-1 justify-between">
                <View className="gap-6">
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <Input
                                label="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                                value={field.value}
                                onChangeText={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <Input
                                label="Senha"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="password"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </View>

                <View className="flex-row gap-6">
                    <Button size="icon" color="gray" onPress={router.back}>
                        <ArrowLeftIcon size={20} color={"#18181B"} />
                    </Button>
                    <Button className="flex-1" onPress={handleSubmit} loading={form.formState.isSubmitting}>
                        Entrar
                    </Button>
                </View>
            </View>
        </AuthLayout>
    )
}