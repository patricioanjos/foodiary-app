import { z } from 'zod';

export const foodSchema = z.object({
  name: z.string({ error: 'O nome do alimento é obrigatório.' }),
  quantity: z.string({ error: 'A quantidade é obrigatória.' }),
  calories: z.number({ error: 'As calorias são obrigatórias.' }),
  carbohydrates: z.number({ error: 'Os carboidratos são obrigatórios.' }),
  proteins: z.number({ error: 'As proteínas são obrigatórias.' }),
  fats: z.number({ error: 'As gorduras são obrigatórias.' }),
});

export const mealSchema = z.object({
  name: z.string({ error: 'O nome da refeição é obrigatório.' }),
  icon: z.string({ error: 'O ícone é obrigatório.' }),
  foods: z.array(foodSchema).min(1, 'A lista de alimentos não pode estar vazia.'),
});

export type MealData = z.infer<typeof mealSchema>;