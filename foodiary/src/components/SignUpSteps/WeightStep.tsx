import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";
import { Input } from "../Input";

export function WeightStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <Controller
            control={form.control}
            name="weight"
            render={({ field, fieldState }) => (
                <Input
                    label="Peso"
                    placeholder="Ex: 70"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                    keyboardType="numeric"
                    append="kg"
                />
            )}
        />
    )
}