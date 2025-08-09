import { eq } from "drizzle-orm";
import { db } from "../db";
import { mealsTable } from "../db/schema";

export class ProcessMeal {
    static async process({ fileKey }: { fileKey: string }) {
        const meal = await db.query.mealsTable.findFirst({
            where: eq(mealsTable.inputFileKey, fileKey)
        })

        if (!meal) {
            throw new Error('Meal not found')
        }

        if (meal.status === 'success' || meal.status === 'failed') {
            return
        }

        await db.update(mealsTable)
            .set({ status: 'processing' })
            .where(eq(mealsTable.id, meal.id))

        try {
            //IA SERÁ IMPLEMENTADA AQUI

            await db.update(mealsTable).set({
                name: 'Café da manhã',
                status: 'success',
                icon: '',
                foods: [
                    {
                        name: 'Pão com ovo',
                        qauntity: '2 fatias de pão e 1 ovo',
                        calories: 210,
                        proteins: 9.78,
                        carbohydrates: 29,
                        fats: 10
                    }
                ]
            }).where(eq(mealsTable.id, meal.id))
        } catch {
            await db.update(mealsTable).set({
                status: 'failed',
            }).where(eq(mealsTable.id, meal.id))
        }
    }
}