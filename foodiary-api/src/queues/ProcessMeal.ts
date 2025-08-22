import { eq } from "drizzle-orm";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { getMealDetailsFromText, transcribeAudio } from "../services/ai";
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
            let icon, name = ''
            let foods = []

            if (meal.inputType === 'audio') {
                const audioFileBuffer = await this.downloadAudioFile(meal.inputFileKey)
                const transcription = await transcribeAudio(audioFileBuffer)

                const mealsDetails = await getMealDetailsFromText({
                    createdAt: meal.createdAt,
                    text: transcription
                })

                icon = mealsDetails.icon
                name = mealsDetails.name
                foods = mealsDetails.foods

                console.log({ transcription })
            }

            await db.update(mealsTable).set({
                name,
                status: 'success',
                icon,
                foods
            }).where(eq(mealsTable.id, meal.id))
        } catch {
            await db.update(mealsTable).set({
                status: 'failed',
            }).where(eq(mealsTable.id, meal.id))
        }
    }

    private static async downloadAudioFile(fileKey: string) {
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey
        })

        const { Body } = await s3Client.send(command)
        if (!Body || !(Body instanceof Readable)) {
            throw new Error('Unable to load audio file')
        }

        const chunks = []
        for await (const chunk of Body) {
            chunks.push(chunk)
        }

        return Buffer.concat(chunks)
    }
}