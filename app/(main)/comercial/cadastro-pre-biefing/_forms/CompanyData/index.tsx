"use client"

import Form from "@/components/Form"
import { useZodForm } from "@/hooks/useZodForm"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import { Controller, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import DropdownMenu from "@/components/Form/DropdownMenu"
import { Input } from "@/components/ui/input"
import { formatterCNPJ } from "@/utils/formatters"
import { useEffect, useState } from "react"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"

const CompanyData = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing } = usePreBriefingStore()
	const [hasDocumentType, setHasDocumentType] = useState<boolean>(false)

	const form = useZodForm(formSchema, "comercial")
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	const hasValue = form.watch("bussinessDocumentType")

	useEffect(() => {
		hasValue?.length > 0 ? setHasDocumentType(true) : setHasDocumentType(false)
	}, [hasValue])

	const handleNextStep = async (values: FieldValues) => {
		await useIsValidFormField({ form, fields: values as never, setData: addPreBriefing as never, nextStep })
	}

	return (
		<Form
			formSchema={formSchema}
			urlPath={urlPath}
			form={form}
			prevStep={prevStep}
			nextStep={handleNextStep}
			actualStep={actualStep}
			percentageProgress={percentageProgress}
			formContent={
				<>
					<Controller
						name="bussinessDocumentType"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<DropdownMenu
									id="bussinessDocumentType"
									form={form}
									name="bussinessDocumentType"
									label="Tipo documento"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[
										{ label: "ITIN", value: "ITIN" },
										{ label: "EIN", value: "EIN" },
										{ label: "CNPJ", value: "CNPJ" }
									]}
								/>
							</Field>
						)}
					/>
					<Controller
						name="bussinessDocumentNumber"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field className={!hasDocumentType ? "blocked-field" : undefined}>
								<FieldLabel>Documento</FieldLabel>
								<Input
									{...field}
									maxLength={16}
									placeholder="12312321312"
									disabled={!hasDocumentType && true}
									onChange={(event) => field.onChange(formatterCNPJ(event.target.value))}
								/>
								<FieldError>{firstErrorKey === "bussinessDocumentNumber" && String(form.formState.errors.bussinessDocumentNumber?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="segment"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<DropdownMenu
									id="segment"
									form={form}
									name="segment"
									label="Segmento"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[{ label: "Flooring", value: "FLOORING" }]}
								/>
							</Field>
						)}
					/>
					<Controller
						name="bussinessName"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>Nome da empresa</FieldLabel>
								<Input {...field} maxLength={155} placeholder="TS System LLC" />
								<FieldError>{firstErrorKey === "bussinessName" && String(form.formState.errors.bussinessName?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="programType"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<DropdownMenu
									id="programType"
									form={form}
									name="programType"
									label="Tipo de programa"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[{ label: "Programa Acelerador", value: "ACCELERATOR_PROGRAM" }]}
								/>
							</Field>
						)}
					/>
				</>
			}
		/>
	)
}

export default CompanyData
