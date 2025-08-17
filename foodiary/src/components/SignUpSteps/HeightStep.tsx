import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";
import { Input } from "../Input";

export function HeightStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <Controller
            control={form.control}
            name="height"
            render={({ field, fieldState }) => (
                <Input
                    label="Altura"
                    placeholder="Ex: 175"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                    keyboardType="numeric"
                    append="cm"
                />
            )}
        />
    )
}