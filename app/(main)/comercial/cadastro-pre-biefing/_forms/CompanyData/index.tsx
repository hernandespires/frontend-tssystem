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
import { formatterCNPJ, formatterEIN, formatterITIN } from "@/utils/formatters"
import { useEffect, useState, useRef } from "react"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { usePreBriefingFormStore } from "@/store/comercial/PreBriefingFormStore"

const CompanyData = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing } = usePreBriefingStore()
	const formStore = usePreBriefingFormStore()
	const [hasDocumentType, setHasDocumentType] = useState<boolean>(!!formStore.bussinessDocumentType)

	const form = useZodForm(formSchema, "comercial", {
		defaultValues: {
			bussinessDocumentType: formStore.bussinessDocumentType,
			bussinessDocumentNumber: formStore.bussinessDocumentNumber,
			segment: formStore.segment,
			bussinessName: formStore.bussinessName
		} as never
	})
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	const hasValue = form.watch("bussinessDocumentType")
	const isFirstRender = useRef(true)

	useEffect(() => {
		hasValue?.length > 0 ? setHasDocumentType(true) : setHasDocumentType(false)

		if (!isFirstRender.current) {
			form.setValue("bussinessDocumentNumber", "")
			form.clearErrors("bussinessDocumentNumber")
		}

		isFirstRender.current = false
	}, [hasValue, form])

	const saveFormState = () => {
		const values = form.getValues()
		formStore.setFormState({
			bussinessDocumentType: values.bussinessDocumentType ?? "",
			bussinessDocumentNumber: values.bussinessDocumentNumber ?? "",
			segment: values.segment ?? "",
			bussinessName: values.bussinessName ?? ""
		})
	}

	const handleDocumentChange = (value: string, type: string) => {
		if (type === "EIN") return formatterEIN(value)
		if (type === "ITIN") return formatterITIN(value)
		return formatterCNPJ(value)
	}

	const getDocumentPlaceholder = (type: string) => {
		if (type === "EIN") return "00-0000000"
		if (type === "ITIN") return "000-00-0000"
		return "00.000.000/0000-00"
	}

	const getDocumentMaxLength = (type: string) => {
		if (type === "EIN") return 10
		if (type === "ITIN") return 11
		return 18
	}

	const handlePrevStep = () => {
		saveFormState()
		prevStep()
	}

	const handleNextStep = async (values: FieldValues) => {
		saveFormState()
		await useIsValidFormField({ form, fields: values as never, setData: addPreBriefing as never, nextStep })
	}

	return (
		<Form
			formSchema={formSchema}
			urlPath={urlPath}
			form={form}
			prevStep={handlePrevStep}
			nextStep={handleNextStep}
			actualStep={actualStep}
			percentageProgress={percentageProgress}
			maxSteps={6}
			title="Dados da empresa"
			formContent={
				<>
					<Controller
						name="bussinessDocumentType"
						control={form.control}
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
						render={({ field }) => (
							<Field className={!hasDocumentType ? "blocked-field" : undefined}>
								<FieldLabel>Documento</FieldLabel>
								<Input
									{...field}
									maxLength={getDocumentMaxLength(hasValue)}
									placeholder={getDocumentPlaceholder(hasValue)}
									disabled={!hasDocumentType && true}
									onChange={(event) => field.onChange(handleDocumentChange(event.target.value, hasValue))}
								/>
								<FieldError>{firstErrorKey === "bussinessDocumentNumber" && String(form.formState.errors.bussinessDocumentNumber?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="segment"
						control={form.control}
						render={() => (
							<Field>
								<DropdownMenu
									id="segment"
									form={form}
									name="segment"
									label="Segmento"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[
										{ label: "Construção", value: "CONSTRUCTION" },
										{ label: "Limpeza", value: "CLEANING" },
										{ label: "Medicina", value: "MEDICINE" },
										{ label: "Refrigeração", value: "REFRIGERATION" },
										{ label: "Outro", value: "OTHER" }
									]}
								/>
							</Field>
						)}
					/>
					<Controller
						name="bussinessName"
						control={form.control}
						render={({ field }) => (
							<Field>
								<FieldLabel>Nome da empresa</FieldLabel>
								<Input {...field} maxLength={155} placeholder="TS System LLC" />
								<FieldError>{firstErrorKey === "bussinessName" && String(form.formState.errors.bussinessName?.message)}</FieldError>
							</Field>
						)}
					/>
				</>
			}
		/>
	)
}

export default CompanyData
