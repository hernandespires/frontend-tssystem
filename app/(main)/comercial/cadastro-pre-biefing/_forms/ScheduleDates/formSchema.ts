import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	programType: z.enum(["ACCELERATOR_PROGRAM"], defaultError("Tipo de programa")).nonoptional(defaultEmptyError("Tipo de programa")),
	contractDate: z
		.any()
		.nonoptional(defaultEmptyError("Data do contrato"))
		.transform((v) => new Date(v))
		.refine((d) => !isNaN(d.getTime()), "Data inválida"),
	paymentDate: z
		.any()
		.nonoptional(defaultEmptyError("Data de pagamento"))
		.transform((v) => new Date(v))
		.refine((d) => !isNaN(d.getTime()), "Data inválida")
})
