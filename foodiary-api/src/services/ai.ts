import OpenAI, { toFile } from "openai";
import { MealData, mealSchema } from "../lib/zod/mealSchema";
import z from "zod";

const client = new OpenAI()

export async function transcribeAudio(file: Buffer) {
  const transcription = await client.audio.transcriptions.create({
    model: 'whisper-1',
    language: 'pt',
    response_format: 'text',
    file: await toFile(file, 'audio.m4a', { type: 'audio/m4a' })
  })

  return transcription
}

type GetMealDetailsFromTextParams = {
  text: string
  createdAt: Date
}

type GetMealDetailsFromImageParams = {
  imageURL: string
  createdAt: Date
}

function getMealNameByDate(date: Date): { name: string } {
  const hour = date.getHours()

  if (hour >= 5 && hour < 11) {
    return { name: "Café da Manhã" }
  }
  if (hour >= 11 && hour < 15) {
    return { name: "Almoço" }
  }
  if (hour >= 15 && hour < 18) {
    return { name: "Lanche da tarde" }
  }
  if (hour >= 18 && hour < 23) {
    return { name: "Jantar" }
  }
  return { name: "Ceia" }
}

export async function getMealDetailsFromText({ createdAt, text }: GetMealDetailsFromTextParams): Promise<MealData> {
  const mealInfo = getMealNameByDate(createdAt);

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: `
          Você é um nutricionista e está atendendo um de seus pacientes. Você deve responder para ele seguindo as instruções abaixo.

          Seu papel é:
          1. Escolher um emoji para a refeição.
          2. Identificar os alimentos no texto.
          3. Estimar, para cada alimento identificado:
            - Nome do alimento (em português)
            - Quantidade aproximada (em gramas ou unidades)
            - Calorias (kcal)
            - Carboidratos (g)
            - Proteínas (g)
            - Gorduras (g)

          Seja direto, objetivo e evite explicações. Apenas retorne os dados em JSON no formato abaixo:

          {
            "icon": "🍗",
            "foods": [
              {
                "name": "Arroz branco cozido",
                "quantity": "150g",
                "calories": 193,
                "carbohydrates": 42,
                "proteins": 3.5,
                "fats": 0.4
              },
              {
                "name": "Peito de frango grelhado",
                "quantity": "100g",
                "calories": 165,
                "carbohydrates": 0,
                "proteins": 31,
                "fats": 3.6
              }
            ]
          }
        `
      },
      {
        role: 'user',
        content: `
                    Data: ${createdAt}
                    Refeição: ${text}
                `
      }
    ]
  })

  const json = response.choices[0].message.content

  if (!json) {
    throw new Error('Failed to process meal.')
  }

  try {
    const parsedJson = JSON.parse(json)

    const finalData = {
      name: mealInfo.name,
      icon: parsedJson.icon,
      foods: parsedJson.foods,
    };

    const validatedData = mealSchema.parse(finalData)

    return validatedData
  } catch (error) {
    console.error('Falha na validação do Zod ou no parse do JSON:', error)
    
    if (error instanceof z.ZodError) {
      console.error('Detalhes do erro do Zod:', error.issues)
    }

    throw new Error('A resposta da IA não está no formato JSON esperado.')
  }
}

export async function getMealDetailsFromImage({ imageURL, createdAt }: GetMealDetailsFromImageParams): Promise<MealData> {
  const mealInfo = getMealNameByDate(createdAt);

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: `
          Meal date: ${createdAt}

          Você é um nutricionista especializado em análise de alimentos por imagem. A imagem a seguir
          foi tirada por um usuário com o objetivo de registrar sua refeição.

          Seu papel é:
          1. Escolher um emoji para a refeição.
          2. Identificar os alimentos presentes na imagem.
          3. Estimar, para cada alimento identificado:
            - Nome do alimento (em português)
            - Quantidade aproximada (em gramas ou unidades)
            - Calorias (kcal)
            - Carboidratos (g)
            - Proteínas (g)
            - Gorduras (g)

          Considere proporções e volumes visíveis para estimar a quantidade. Quando houver incerteza
          sobre o tipo exato do alimento (por exemplo, tipo de arroz, corte de carne), use o tipo mais
          comum. Seja direto, objetivo e evite explicações. Apenas retorne os dados em JSON no formato abaixo:

          {
            "icon": "🍗",
            "foods": [
              {
                "name": "Arroz branco cozido",
                "quantity": "150g",
                "calories": 193,
                "carbohydrates": 42,
                "proteins": 3.5,
                "fats": 0.4
              },
              {
                "name": "Peito de frango grelhado",
                "quantity": "100g",
                "calories": 165,
                "carbohydrates": 0,
                "proteins": 31,
                "fats": 3.6
              }
            ]
          }
        `
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: imageURL }
          }
        ]
      }
    ]
  })

  const json = response.choices[0].message.content

  if (!json) {
    throw new Error('Failed to process meal.')
  }

  try {
    const parsedJson = JSON.parse(json)

    const finalData = {
      name: mealInfo.name,
      icon: parsedJson.icon,
      foods: parsedJson.foods,
    };

    const validatedData = mealSchema.parse(finalData)

    return validatedData
  } catch (error) {
    console.error('Falha na validação do Zod ou no parse do JSON:', error)
    
    if (error instanceof z.ZodError) {
      console.error('Detalhes do erro do Zod:', error.issues)
    }

    throw new Error('A resposta da IA não está no formato JSON esperado.')
  }
}