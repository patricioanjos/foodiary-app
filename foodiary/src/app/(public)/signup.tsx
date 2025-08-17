import { router } from "expo-router";
import { useState } from "react";
import { AuthLayout } from "../../components/AuthLayout";
import { GoalStep } from "../../components/SignUpSteps/GoalStep";
import { GenderStep } from "../../components/SignUpSteps/GenderStep";
import { Alert, View } from "react-native";
import { Button } from "../../components/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../components/SignUpSteps/signUpSchema";
import { BirthDateStep } from "../../components/SignUpSteps/BirthDateStep";
import { HeightStep } from "../../components/SignUpSteps/HeightStep";
import { WeightStep } from "../../components/SignUpSteps/WeightStep";
import { ActivityLevelStep } from "../../components/SignUpSteps/AcitivityLevelStep";
import { AccountStep } from "../../components/SignUpSteps/AccountStep";
import { useAuth } from "../../hooks/useAuth";
import { isAxiosError } from "axios";

export default function SignUp() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const { signUp } = useAuth()

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
        {
            icon: '',
            title: 'Que dia você nasceu',
            subtitle: 'Cada faixa etária responde de forma única',
            Component: BirthDateStep
        },
        {
            icon: '📏',
            title: 'Qual é sua altura',
            subtitle: 'Sua altura é importante para o cálculo do IMC',
            Component: HeightStep
        },
        {
            icon: '⚖️',
            title: 'Qual é seu peso?',
            subtitle: 'Seu peso nos ajuda a criar sua dieta',
            Component: WeightStep
        },
        {
            icon: '',
            title: 'Qual seu nível de atividade?',
            subtitle: 'Isso nos ajuda a calcular suas necesscidades calóricas',
            Component: ActivityLevelStep
        },
        {
            icon: '',
            title: 'Crie sua conta',
            subtitle: 'Finalize seu cadastro para começar sua jornada',
            Component: AccountStep
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

    const handleSubmit = form.handleSubmit(async (formData) => {
        try {
            const [day, month, year] = formData.birthDate.split('/')

            await signUp({
                goal: formData.goal,
                gender: formData.gender,
                birthDate: `${year}-${month}-${day}`,
                activityLevel: Number(formData.activityLevel),
                height: Number(formData.height),
                weight: Number(formData.weight),
                account: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            })
        } catch (error) {
            console.log(error)
            Alert.alert('Erro ao criar conta')
        }
    })

    const currentStep = steps[currentStepIndex]
    const isLastStep = currentStepIndex === steps.length - 1

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

                    {isLastStep ? (
                        <Button className="flex-1" onPress={handleSubmit} loading={form.formState.isSubmitting}>
                            Criar conta
                        </Button>
                    ) : (
                        <Button size="icon" onPress={hadleNextStep}>
                            <ArrowRightIcon size={20} color={"#18181B"} />
                        </Button>
                    )}
                </View>
            </View>
        </AuthLayout>
    )
}