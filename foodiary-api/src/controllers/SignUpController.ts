import { z } from 'zod'
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflit, created } from "../utils/http";
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';
import { hash } from 'bcryptjs';
import { signAccessToken } from '../lib/jwt';
import { calculateGoals } from '../lib/goalCalculator';

const schema = z.object({
    goal: z.enum(['lose', 'maintain', 'gain']),
    gender: z.enum(['male', 'female']),
    birthDate: z.iso.date(),
    height: z.number(),
    weight: z.number(),
    activityLevel: z.number().min(1).max(5),
    account: z.object({
        name: z.string().min(2),
        email: z.email(),
        password: z.string().min(8)
    })
})

export class SignUpController {
    static async handle({ body }: HttpRequest): Promise<HttpResponse> {
        const { success, error, data } = schema.safeParse(body)

        if (!success) {
            return badRequest({ errors: error.issues })
        }

        const userAlreadyExists = await db.query.usersTable.findFirst({
            columns: {
                email: true
            },
            where: eq(usersTable.email, data.account.email)
        })

        if (userAlreadyExists) {
            return conflit({ error: 'Email is already in use' })
        }

        const goals = calculateGoals({
            goal: data.goal,
            gender: data.gender,
            birthDate: new Date(data.birthDate),
            height: data.height,
            weight: data.weight,
            activityLevel: data.activityLevel
        })

        const hashedPassword = await hash(data.account.password, 10)

        const [user] = await db.insert(usersTable).values({
            ...data,
            ...data.account,
            ...goals,
            password: hashedPassword,
        }).returning({
            id: usersTable.id
        })

        const accessToken = signAccessToken(user.id)

        return created({
            accessToken
        })
    }
}