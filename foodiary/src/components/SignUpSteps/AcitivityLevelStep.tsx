import { OptionsSelector } from "../OptionsSelector";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";
import { ScrollView } from "react-native";

export function ActivityLevelStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <ScrollView className="mb-6">
            <Controller
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                    <OptionsSelector
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                            {
                                icon: '🪑',
                                title: 'Sedentário',
                                description: 'Não me exercito',
                                value: '1'
                            },
                            {
                                icon: '🌿',
                                title: 'Leve',
                                description: '1-2 vezes por semana',
                                value: '2'
                            },
                            {
                                icon: '⚡',
                                title: 'Moderado',
                                description: '3-5 vezes por semana',
                                value: '3'
                            },
                            {
                                icon: '🔥',
                                title: 'Pesado',
                                description: '6-7 vezes por semana',
                                value: '4'
                            },
                            {
                                icon: '🏋️‍♂️',
                                title: 'Atleta',
                                description: '2 vezes por dia',
                                value: '5'
                            },
                        ]}
                    />
                )}
            />
        </ScrollView>
    )
}