import z from "zod"

export const formSchema = z.object({
    name: z.string().min(1).nonempty("Nome é obrigatório"),
    birthday: z.coerce.date(),
    civilState: z.string(),
    nacionality: z.tuple([z.string().min(1), z.string().optional()]),
    rg: z.string().min(1).min(12).max(12),
    cpf: z.string().min(1).min(12).max(12),
    email: z.string(),
    motherName: z.string().min(1),
    phone: z.string(),
    city: z.string(),
    postalCode: z.string(),
    street: z.string(),
    neighborhood: z.string()
})