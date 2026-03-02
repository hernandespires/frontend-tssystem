import { defaultEmptyError, defaultError } from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	projectType: z.string({ error: defaultError("Tipo de projeto") }).nonempty(defaultEmptyError(defaultEmptyError("Tipo de projeto")))
})
