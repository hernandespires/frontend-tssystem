import z from "zod"
import { defaultEmptyError, defaultError } from "../defaultFormFieldErrors"

export const formSchema = z.object({
    name: z.string({ error: defaultError("Nome") }).nonempty(defaultEmptyError(defaultEmptyError("Nome"))),
    birthday: z.date({ error: defaultError("Data de nascimento") }).nonoptional(defaultEmptyError("Data de nascimento")),
    civilState: z.enum(["SINGLE", "MARRIED", "WIDOWED"], { error: defaultError("Estado civil") }).nonoptional(defaultEmptyError("Estado civil")),
    // nacionality: z.enum(["BRAZILIAN", "AMERICAN"], { error: defaultError("Nacionalidade") }).nonoptional(defaultEmptyError("Nacionalidade")),
    rg: z.string({ error: defaultError("RG") }).nonempty(defaultEmptyError("RG")).min(12, defaultError("RG")),
    cpf: z.string({ error: defaultError("CPF") }).nonempty(defaultEmptyError("CPF")).min(14, defaultError("CPF")),
    email: z.string({ error: defaultError("Email") }).nonempty(defaultEmptyError("Email")),
    motherName: z.string({ error: defaultError("Nome da mãe") }).nonempty(defaultEmptyError("Nome da mãe")),
    phone: z.string({ error: defaultError("Celular") }).min(11, defaultError("Celular")),
    city: z.string({ error: defaultError("Cidade") }).nonempty(defaultEmptyError("Cidade")),
    postalCode: z.string({ error: defaultError("Código postal") }).nonempty(defaultEmptyError("Código postal")).min(9, defaultError("Código postal")),
    street: z.string({ error: defaultError("Rua") }).nonempty(defaultEmptyError("Rua")),
    neighborhood: z.string({ error: defaultError("Bairro") }).nonempty(defaultEmptyError("Bairro"))
})