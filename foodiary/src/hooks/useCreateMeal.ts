import { useMutation } from "@tanstack/react-query"
import { httpClient } from "../services/httpClient"

type CreateMealParams = {
    fileType: 'audio/m4a' | 'image/jpg'
    onSuccess(mealId: string): void
}

export function useCreateMeal({fileType, onSuccess}: CreateMealParams) {
    const { mutateAsync: createMeal, isPending } = useMutation({
        mutationFn: async (uri: string) => {
            const { data } = await httpClient.post('/meals', {
                fileType
            })

            const { uploadURL } = data

            const response = await fetch(uri)
            const file = await response.blob()

            await fetch(uploadURL, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            })

            return {mealId: data.mealId}
        },

        onSuccess: ({mealId}) => {
            onSuccess(mealId)
        }
    })

    return {
        createMeal,
        isLoading: isPending
    }
}