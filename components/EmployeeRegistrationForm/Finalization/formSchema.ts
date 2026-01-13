import z from "zod"

export const formSchema = z.object({
    department: z.string().min(1), operation: z.string().min(1), level: z.string().min(1)
})