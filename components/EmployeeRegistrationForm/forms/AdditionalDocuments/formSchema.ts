import z from "zod"

export const formSchema = z.object({
    bank: z.string().min(1)
})