import { useMutation } from "@tanstack/react-query"
import { httpClient } from "../services/httpClient"

export function useCreateMeal(fileType: 'audio/m4a' | 'image/jpg') {
    const { mutateAsync: createMeal } = useMutation({
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
        }
    })

    return {
        createMeal
    }
}