import z from "zod"
import { defaultEmptyError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({ department: z.string().nonempty(defaultEmptyError("Departamento")), operation: z.string().nonempty(defaultEmptyError("Operação")), level: z.string().nonempty("Nível") })