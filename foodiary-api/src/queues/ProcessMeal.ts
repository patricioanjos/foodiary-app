import { eq } from "drizzle-orm";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { transcribeAudio } from "../services/ai";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client";
import { Readable } from "node:stream";

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
            if (meal.inputType === 'audio') {
                const command = new GetObjectCommand({
                    Bucket: process.env.BUCKET_NAME,
                    Key: meal.inputFileKey
                })

                const { Body } = await s3Client.send(command)
                if (!Body || !(Body instanceof Readable)) {
                    throw new Error('Unable to load audio file')
                }

                const chunks = []
                for await (const chunk of Body) {
                    chunks.push(chunk)
                }

                const audioFileBuffer = Buffer.concat(chunks)

                const transcription = await transcribeAudio(audioFileBuffer)

                console.log({ transcription })
            }

            await db.update(mealsTable).set({
                name: 'Café da manhã',
                status: 'success',
                icon: '',
                foods: [
                    {
                        name: 'Pão com ovo',
                        quantity: '2 fatias de pão e 1 ovo',
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