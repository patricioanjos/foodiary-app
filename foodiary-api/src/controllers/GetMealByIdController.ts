import { z } from "zod";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, ok } from "../utils/http";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import tr from "zod/v4/locales/tr.cjs";

const schema = z.object({
    mealId: z.uuid()
})

export class GetMealByIdController {
    static async handle({ userId, params }: ProtectedHttpRequest): Promise<HttpResponse> {
        const { success, error, data } = schema.safeParse(params)

        if (!success) {
            return badRequest({ errors: error.issues })
        }

        const meal = await db.query.mealsTable.findFirst({
            columns: {
                id: true,
                name: true,
                icon: true,
                status: true,
                foods: true,
                createdAt: true
            },
            where: and(
                eq(mealsTable.id, data.mealId),
                eq(mealsTable.userId, userId),
            )
        })

        return ok({
            meal
        })
    }
}