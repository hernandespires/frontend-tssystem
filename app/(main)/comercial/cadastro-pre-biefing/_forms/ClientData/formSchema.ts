import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	clientName: z
		.string({ error: defaultError("Nome completo") })
		.max(155, defaultError("Nome completo"))
		.nonempty(defaultEmptyError("Nome completo")),
	nacionality: z.enum(["BRAZILIAN", "AMERICAN"], { error: defaultError("Nacionalidade") }).nonoptional(defaultEmptyError("Nacionalidade")),
	email: z
		.string({ error: defaultError("Email") })
		.max(155, defaultError("Nome completo"))
		.nonempty(defaultEmptyError("Email")),
	phone: z
		.string({ error: defaultError("Telefone") })
		.min(19, defaultError("Telefone"))
		.max(19, defaultError("Telefone"))
		.nonempty(defaultEmptyError("Telefone")),
	address: z
		.string({ error: defaultError("Endereço") })
		.max(155, defaultError("Endereço"))
		.nonempty(defaultEmptyError("Endereço")),
	documentType: z.enum(["ITIN", "EIN", "CNPJ"], { error: defaultError("Tipo de documento") }).nonoptional(defaultEmptyError("Tipo de documento")),
	documentNumber: z
		.string({ error: defaultError("Número do documento") })
		.max(18, defaultError("Número do documento"))
		.nonempty(defaultEmptyError("Número do documento"))
})
