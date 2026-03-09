import { toast } from "sonner"
import { FieldValues } from "react-hook-form"

export const useIsValidFormField = async <T extends FieldValues>({ form, fields, setData, nextStep }) => {
	const isValid = await form.trigger()

	if (!isValid) {
		const errors = form.formState.errors
		const firstError = Object.values(errors).find((err: any) => err?.message)

		if (firstError?.message) toast.error(String(firstError.message))
		return
	}

	const { additionalDocuments, ...safeFields } = fields as any

	setData({ ...safeFields })

	if (nextStep) nextStep((prev) => prev + 1)
}
