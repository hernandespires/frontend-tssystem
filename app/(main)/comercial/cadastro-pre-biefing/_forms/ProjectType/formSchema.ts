import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	projectType: z.string({ error: defaultError("Tipo de projeto") }).nonempty(defaultEmptyError(defaultEmptyError("Tipo de projeto")))
})
