import { Dispatch, ReactNode, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { ZodBoolean, ZodEnum, ZodNonOptional, ZodObject, ZodOptional, ZodString } from "zod"
import { $strip } from "zod/v4/core"

export interface FormType {
	formSchema?: ZodObject<
		{
			paymentMethod: ZodNonOptional<
				ZodEnum<{
					PIX: "PIX"
					INVOICE: "INVOICE"
					PAYMENT_SLIP: "PAYMENT_SLIP"
				}>
			>
			hasInstallments: ZodBoolean
			installments: ZodOptional<ZodString>
			entryValue: ZodString
		},
		$strip
	>
	nextStep: Dispatch<SetStateAction<number>>
	urlPath: { name: string; route: string }[]
	form?: UseFormReturn<
		{
			paymentMethod: "PIX" | "INVOICE" | "PAYMENT_SLIP"
			hasInstallments: boolean
			entryValue: string
			installments?: string | undefined
		},
		any,
		{
			paymentMethod: "PIX" | "INVOICE" | "PAYMENT_SLIP"
			hasInstallments: boolean
			entryValue: string
			installments?: string | undefined
		}
	>
	prevStep: () => void
	actualStep: number
	percentageProgress: number
	hasTwoForm?: boolean
	formContent?: ReactNode
	leftFormContent?: ReactNode
	rightFormContent?: ReactNode
}
