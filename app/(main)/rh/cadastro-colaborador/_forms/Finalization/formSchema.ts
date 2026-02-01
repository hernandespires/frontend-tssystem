import z from "zod"
import { defaultEmptyError, defaultError } from "../defaultFormFieldErrors"

export const formSchema = z.object({
    department: z.enum(["RESEARCH_AND_DEVELOPMENT", "WEB_DESIGN", "PAID_TRAFFIC"], { error: defaultError("Departamento") }).nonoptional(defaultEmptyError("Departamento")),
    operation: z.enum(["_01", "_02", "_03"], { error: defaultError("Operação") }).nonoptional(defaultEmptyError("Operação")),
    level: z.enum(["PUPPY", "ASSISTANT", "JUNIOR"]).nonoptional("Nível")
})