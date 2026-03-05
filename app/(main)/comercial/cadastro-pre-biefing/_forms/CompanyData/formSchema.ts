import { defaultEmptyError, defaultError } from "@/components/Form/defaultFormFieldErrors"
import z from "zod"

export const formSchema = z.object({
	segment: z.enum(["Flooring", "FLOORING"], { error: defaultError("Segmento") }).nonoptional(defaultEmptyError("Segmento"))
})
