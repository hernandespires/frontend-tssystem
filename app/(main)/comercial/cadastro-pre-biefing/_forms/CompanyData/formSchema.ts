import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	bussinessDocumentType: z.enum(["ITIN", "EIN", "CNPJ"], defaultError("Tipo documento")).nonoptional("Tipo documento"),
	bussinessDocumentNumber: z.string(defaultError("Documento")).max(18, defaultError("Documento")).nonempty(defaultEmptyError("Documento")),
	segment: z.enum(["FLOORING"], defaultError("Segmento")).nonoptional(defaultEmptyError("Segmento")),
	bussinessName: z.string(defaultError("Nome da empresa")).max(155, defaultError("Nome da empresa")).nonempty(defaultEmptyError("Nome da empresa")),
	programType: z.enum(["ACCELERATOR_PROGRAM"], defaultError("Tipo de programa")).nonoptional("Tipo de programa")
})
