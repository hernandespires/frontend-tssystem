import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	paymentMethod: z
		.enum(["PIX", "INVOICE", "PAYMENT_SLIP"], { error: defaultError("Forma de pagamento") })
		.nonoptional(defaultEmptyError("Forma de pagamento")),
	installments: z
		.number({ error: defaultError("Quantidade de parcelas") })
		.default(1)
		.optional(),
	entryValue: z
		.string({ error: defaultError("Valor do lançamento") })
		.max(13, defaultError("Valor do lançamento"))
		.nonempty(defaultEmptyError("Valor do lançamento"))
})
