import { toast } from "sonner"
import { UseFormReturn, FieldValues } from "react-hook-form"

type OnChangeFormStepParams<T extends FieldValues> = { form: UseFormReturn<T>, fields: T, setData: React.Dispatch<React.SetStateAction<any>>, nextStep: (step: number) => void }

export const onChangeFormStep = async <T extends FieldValues>({ form, fields, setData, nextStep }: OnChangeFormStepParams<T>) => {
    const isValid = await form.trigger()

    if (!isValid) {
        const errors = form.formState.errors
        const firstError = Object.values(errors).find((err: any) => err?.message)

        if (firstError?.message) toast.error(String(firstError.message))

        return
    }

    setData((prev) => ({ ...prev, ...fields }))

    nextStep(nextStep)
}