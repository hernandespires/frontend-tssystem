import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	leadSource: z.enum(["ACTIVE_PROSPECTING"], defaultError("Origem do Lead")).nonoptional(defaultError("Origem do Lead")),
	leadArrivalDate: z
		.any()
		.nonoptional(defaultEmptyError("Data do contrato"))
		.transform((v) => new Date(v))
		.refine((d) => !isNaN(d.getTime()), "Data inválida"),
	meetingLink: z
		.string(defaultError(defaultError("Link da reunião")))
		.max(155, defaultError("Link da reunião"))
		.nonempty(defaultEmptyError("Link da reunião"))
})
