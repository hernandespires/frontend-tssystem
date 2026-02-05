import z from "zod"
import { defaultEmptyError, defaultError } from "../defaultFormFieldErrors"

export const formSchema = z.object({
    workCard: z.string({ error: defaultError("Carteira de trabalho") }).nonempty(defaultEmptyError("Carteira de trabalho")).min(14, defaultError("Carteira de trabalho")),
    pisPasep: z.string({ error: defaultError("Pis Pasep") }).nonempty(defaultEmptyError("Pis Pasep")).min(14, defaultError("Pis Pasep")),    
    typeEmployment:z.enum(["CLT", "CNPJ", "FREELANCE"], { error: defaultError("Tipo de vínculo") }).nonoptional(defaultEmptyError("Tipo de vínculo")),
    laborModality: z.enum(["IN_PERSON", "HYBRID", "HOME_OFFICE"], { error: defaultError("Modalidade") }).nonoptional(defaultEmptyError("Modalidade")),
    laborScale: z.enum(["_5X2", "_4X3", "_6X1"], { error: defaultError("Escala") }).nonoptional(defaultEmptyError("Escala")),
    admissionDate: z.date({ error: defaultError("Data de admissão") }).nonoptional(defaultEmptyError("Data de admisão")),
    salary: z.string({ error: defaultError("Salário") }).nonempty(defaultEmptyError("Salário")).max(13, defaultError("Salário")),
    residentialProve: z.any()
    .refine((files) => {        
        if (!files || files.length === 0) return true
        return files[0] instanceof File
    }, defaultError("Comprovante de residência")).optional(),
    reservist: z.boolean(),
    documentation: z.any().optional()
}).superRefine((data, ctx) => {
    if (data.reservist) {
        if (!data.documentation || data.documentation.length === 0) ctx.addIssue({ code: "custom", path: ["documentation"], message: defaultError("Documentação") })
    }
})