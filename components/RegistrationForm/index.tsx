"use client"

import { z, ZodObject, ZodRawShape } from "zod"
import { toast } from "sonner"
import { Form } from "../ui/form"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import { FaArrowLeft } from "react-icons/fa"
import { FieldValues, SubmitErrorHandler, UseFormReturn } from "react-hook-form"
import RoutesList from "../RoutesList"
import { LuArrowBigRight } from "react-icons/lu"

const RegistrationForm = ({
	formSchema,
	urlPath,
	form,
	prevStep,
	children,
	haveAdvanceButton = true,
	nextStep
}: {
	formSchema: ZodObject<ZodRawShape>
	urlPath: { name: string; route: string }[]
	form: UseFormReturn<FieldValues>
	prevStep: () => void
	children: ReactNode
	haveAdvanceButton?: boolean
	nextStep?: (values: FieldValues) => Promise<void> | void
}) => {
	const onSubmit = (values: z.infer<typeof formSchema>) => nextStep?.(values)

	const onError: SubmitErrorHandler<FieldValues> = (errors) => {
		const firstError = Object.values(errors).find((err) => err?.message)
		if (firstError?.message) toast.error(firstError.message as string)
	}

	return (
		<section className="flex flex-col gap-3">
			<RoutesList>{urlPath}</RoutesList>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit, onError)} className="border px-5.5 py-3 flex flex-col gap-3 rounded-md min-h-[calc(100vh-180px)]">
					<div className="flex gap-x-6 items-center">
						<Button type="button" variant="secondary" className="cursor-pointer" onClick={prevStep}>
							<FaArrowLeft />
							Voltar
						</Button>
						<span className="section-title">{urlPath.at(-1)?.name}</span>
					</div>
					<div className="flex flex-col gap-y-6 flex-1 justify-center mb-15">{children}</div>
					{haveAdvanceButton && (
						<div className="flex justify-center">
							<Button className="bg-default-orange h-15.25 w-107.5 cursor-pointer">
								<LuArrowBigRight />
								Avançar
							</Button>
						</div>
					)}
				</form>
			</Form>
		</section>
	)
}

export default RegistrationForm
