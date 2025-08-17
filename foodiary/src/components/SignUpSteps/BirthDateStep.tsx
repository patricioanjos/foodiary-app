import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";
import { Input } from "../Input";

export function BirthDateStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <Controller
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
                <Input
                label="Data de nascimento"
                mask="99/99/9999"
                placeholder="DD/MM/AAAA"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                    keyboardType="numeric"
                />
            )}
        />
    )
}