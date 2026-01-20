import z from "zod"
import { defaultEmptyError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    workCard: z.string().nonempty(defaultEmptyError("Carteira de trabalho")),
    pisPasep: z.string().nonempty(defaultEmptyError("PIS/PASEP")),
    typeEmployment: z.string().nonempty(defaultEmptyError("Tipo de vínculo")),
    laborModality: z.string().nonempty(defaultEmptyError("Modalidade")),
    laborScale: z.string().nonempty(defaultEmptyError("Escala")),
    admissionDate: z.string().nonempty(defaultEmptyError("Data de admissão")),
    salary: z.string().nonempty(defaultEmptyError("Salário")),
    residentialProve: z.any().refine((files) => files?.[0] instanceof File, defaultEmptyError("Comprovante de residência")),
    documentation: z.any().refine((files) => files?.[0] instanceof File).optional()    
})