import z from "zod"
import { defaultEmptyError, defaultError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    name: z.string().nonempty(defaultEmptyError("Nome")),
    birthday: z.date({ error: defaultEmptyError("Data de nascimento") }).nonoptional(""),
    civilState: z.enum(["SINGLE", "MARRIED", "WIDOWED"], { error: defaultEmptyError("Estado civil") }),
    nacionality: z.enum(["BRAZILIAN", "AMERICAN", "OTHER"], { error: defaultEmptyError("Nacionalidade") }),
    rg: z.string().nonempty(defaultEmptyError("RG")).min(12, defaultError("RG")).max(12, defaultError("RG")),
    cpf: z.string({ error: defaultEmptyError("CPF") }).min(11, defaultError("CPF")),
    email: z.string().nonempty(defaultEmptyError("Email")),
    motherName: z.string().nonempty(defaultEmptyError("Nome da mãe")),
    phone: z.string({ error: defaultEmptyError("Celular") }).min(11, defaultError("Celular")),
    city: z.string().nonempty(defaultEmptyError("Cidade")),
    postalCode: z.string({ error: defaultEmptyError("Código postal") }).min(8, defaultError("Celular")),
    street: z.string().nonempty(defaultEmptyError("Rua")),
    neighborhood: z.string().nonempty(defaultEmptyError("Bairro"))
})