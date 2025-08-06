import { eq } from "drizzle-orm";
import { db } from "../db";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { ok } from "../utils/http";
import { usersTable } from "../db/schema";

export class MeController {
    static async handle({ userId }: ProtectedHttpRequest): Promise<HttpResponse> {
        const user = await db.query.usersTable.findFirst({
            columns: {
                id: true,
                name: true,
                email: true,
                calories: true,
                proteins: true,
                carbohydrates: true,
                fats: true
            },
            where: eq(usersTable.id, userId)
        })

        return ok({
            user
        })
    }
}