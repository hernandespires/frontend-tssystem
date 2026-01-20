import z from "zod"
import { defaultEmptyError, defaultError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    name: z.string().nonempty(defaultEmptyError("Nome")),
    birthday: z.date({ error: defaultEmptyError("Data de nascimento") }),
    civilState: z.enum(["single", "married", "widowed"], { error: defaultEmptyError("Estado civil") }),
    nacionality: z.enum(["brazilian", "american", "other"], { error: defaultEmptyError("Nacionalidade") }),
    rg: z.string().nonempty(defaultEmptyError("RG")).min(12, defaultError("RG")).max(12, defaultError("RG")),
    cpf: z.string().nonempty(defaultEmptyError("CPF")).min(12, defaultError("CPF")).max(12, defaultError("CPF")),
    email: z.string().nonempty(defaultEmptyError("Email")),
    motherName: z.string().nonempty(defaultEmptyError("Nome da mãe")),
    phone: z.string().nonempty(defaultEmptyError("Celular")).min(11, defaultError("Celular")).max(11, defaultError("Celular")),
    city: z.string().nonempty(defaultEmptyError("Cidade")),
    postalCode: z.string().nonempty(defaultEmptyError("Código postal")),
    street: z.string().nonempty(defaultEmptyError("Rua")),
    neighborhood: z.string().nonempty(defaultEmptyError("Bairro"))
})