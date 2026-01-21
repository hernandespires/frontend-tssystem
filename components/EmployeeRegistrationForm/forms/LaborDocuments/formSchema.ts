import z from "zod"
import { defaultEmptyError, defaultError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    workCard: z.string({ error: defaultEmptyError("Carteira de trabalho") }).min(11, defaultError("Carteira de trabalho")),
    pisPasep: z.string({ error: defaultEmptyError("PIS/PASEP") }).min(11, defaultError("PIS/P")),
    typeEmployment: z.string({ error: defaultEmptyError("Tipo de vínculo") }),
    laborModality: z.string({ error: defaultEmptyError("Modalidade") }),
    laborScale: z.string({ error: defaultEmptyError("Escala") }),
    admissionDate: z.date({ error: defaultEmptyError("Data de admissão") }),
    salary: z.string({ error: defaultEmptyError("Salário") }),
    residentialProve: z.any().refine((files) => files?.[0] instanceof File, defaultEmptyError("Comprovante de residência")),
    documentation: z.any().refine((files) => files?.[0] instanceof File).optional()
})