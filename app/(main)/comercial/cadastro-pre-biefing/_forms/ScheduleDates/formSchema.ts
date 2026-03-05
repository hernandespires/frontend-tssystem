import { defaultEmptyError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	programPeriod: z.enum(["SIX_MONTHS"]).nonoptional(defaultEmptyError("Tempo de programa")),
	projectStartDate: z
		.any()
		.nonoptional(defaultEmptyError("Data de início do projeto"))
		.transform((v) => new Date(v))
		.refine((d) => !isNaN(d.getTime()), "Data inválida"),
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
