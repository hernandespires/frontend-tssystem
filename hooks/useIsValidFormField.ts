import { toast } from "sonner"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"

export const useIsValidFormField = async <T extends FieldValues>({
	form,
	fields,
	setData,
	nextStep
}: {
	form: UseFormReturn<T>
	fields: Partial<T>
	setData: (data: Partial<T>) => void
	nextStep?: Dispatch<SetStateAction<number>>
}) => {
	const isValid = await form.trigger()

	if (!isValid) {
		const errors = form.formState.errors
		const firstError = Object.values(errors).find((err): err is { message: string } => typeof err === "object" && err !== null && "message" in err)

		if (firstError?.message) toast.error(String(firstError.message))
		return
	}

	const { additionalDocuments: _, ...safeFields } = fields as Record<string, unknown>

	setData(safeFields as Partial<T>)

	if (nextStep) nextStep((prev) => prev + 1)
}
