import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";
import { Input } from "../Input";
import { View } from "react-native";

export function AccountStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <View className="gap-4">
            <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                    <Input
                        label="Nome completo"
                        placeholder="João da Silva"
                        value={field.value}
                        onChangeText={field.onChange}
                        error={fieldState.error?.message}
                        autoCapitalize="words"
                    />
                )}
            />

            <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                    <Input
                        label="Email"
                        placeholder="Digite seu email"
                        value={field.value}
                        onChangeText={field.onChange}
                        error={fieldState.error?.message}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                )}
            />

            <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={field.value}
                        onChangeText={field.onChange}
                        error={fieldState.error?.message}
                        autoCapitalize="none"
                        secureTextEntry
                        autoCorrect={false}
                    />
                )}
            />
        </View>
    )
}