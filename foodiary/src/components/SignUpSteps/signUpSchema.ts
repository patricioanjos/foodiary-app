import z from "zod";

export const signUpSchema = z.object({
    goal: z.enum(['lose', 'maintain', 'gain'])
})

export type SignUpFormData = z.infer<typeof signUpSchema>