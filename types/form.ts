import { Dispatch, ReactNode, SetStateAction } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { ZodObject, ZodRawShape } from "zod"

export interface FormType {
	formSchema?: ZodObject<ZodRawShape>
	nextStep: Dispatch<SetStateAction<number>>
	urlPath: { name: string; route: string }[]
	form?: UseFormReturn<FieldValues>
	prevStep: () => void
	actualStep: number
	percentageProgress: number
	hasTwoForm?: boolean
	formContent?: ReactNode
	leftFormContent?: ReactNode
	rightFormContent?: ReactNode
	maxSteps?: number
	title?: string
}
