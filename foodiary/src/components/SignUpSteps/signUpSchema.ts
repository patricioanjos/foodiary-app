import z from "zod";

export const signUpSchema = z.object({
    goal: z.enum(['lose', 'maintain', 'gain']),
    gender: z.enum(['male', 'female']),
    birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
    height: z.string().min(2, 'Altura é obrigatória'),
    weight: z.string().min(2, 'Peso é obrigatório'),
    activityLevel: z.string(),
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
})

export type SignUpFormData = z.infer<typeof signUpSchema>