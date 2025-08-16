import { router } from "expo-router";
import { useState } from "react";
import { AuthLayout } from "../../components/AuthLayout";
import { GoalStep } from "../../components/SignUpSteps/GoalStep";
import { GenderStep } from "../../components/SignUpSteps/GenderStep";
import { View } from "react-native";
import { Button } from "../../components/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../components/SignUpSteps/signUpSchema";

export default function SignUp() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const form = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const steps = [
        {
            icon: '🎯',
            title: 'Qual é seu objetivo',
            subtitle: 'O que você pretende alcançar com a dieta?',
            Component: GoalStep
        },
        {
            icon: '👥',
            title: 'Qual é seu gênero',
            subtitle: 'Seu gênero influencia no tipo da dieta',
            Component: GenderStep
        },
    ]

    function handlePreviousStep() {
        if (currentStepIndex === 0) {
            router.back()
            return
        }

        setCurrentStepIndex(prevState => prevState - 1)
    }

    function hadleNextStep() {
        setCurrentStepIndex(prevState => prevState + 1)
    }

    const currentStep = steps[currentStepIndex]

    return (
        <AuthLayout
            icon={currentStep.icon}
            title={currentStep.title}
            subtitle={currentStep.subtitle}
        >
            <View className="flex-1 justify-between">
                <FormProvider {...form}>
                    <currentStep.Component />
                </FormProvider>

                <View className="flex-row justify-between gap-6">
                    <Button size="icon" color="gray" onPress={handlePreviousStep}>
                        <ArrowLeftIcon size={20} color={"#18181B"} />
                    </Button>

                    <Button size="icon" onPress={hadleNextStep}>
                        <ArrowRightIcon size={20} color={"#18181B"} />
                    </Button>
                </View>
            </View>
        </AuthLayout>
    )
}