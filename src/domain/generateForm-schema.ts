import { z } from "zod"

export const GenerateFormSchema = z.object({
    interest: z.string().min(1),
    goal: z.string().min(1),
    numberOfDay: z.number().min(1)
})

export type GenerateFormValues = z.infer<typeof GenerateFormSchema>