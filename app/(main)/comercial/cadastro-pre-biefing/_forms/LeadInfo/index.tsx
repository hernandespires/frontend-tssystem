"use client"

import DropdownMenu from "@/components/Form/DropdownMenu"
import Form from "@/components/Form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useZodForm } from "@/hooks/useZodForm"
import { Controller, FieldValues } from "react-hook-form"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import DatePicker from "@/components/Form/DatePicker"
import { Input } from "@/components/ui/input"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { dateToISO } from "@/utils/dateToISO"
import { savePreBriefing } from "@/services/comercial/preBriefing"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePreBriefingFormStore } from "@/store/comercial/PreBriefingFormStore"

const LeadInfo = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const formStore = usePreBriefingFormStore()
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const form = useZodForm(formSchema, "comercial", {
		defaultValues: {
			leadSource: formStore.leadSource,
			leadArrivalDate: formStore.leadArrivalDate,
			meetingLink: formStore.meetingLink
		} as never
	})
	const firstErrorKey = useGetFirstErrorKey(form.formState.errors, Object.keys(formSchema.shape))

	const saveFormState = () => {
		const values = form.getValues()
		formStore.setFormState({
			leadSource: values.leadSource ?? "",
			leadArrivalDate: values.leadArrivalDate,
			meetingLink: values.meetingLink ?? ""
		})
	}

	const handlePrevStep = () => {
		saveFormState()
		prevStep()
	}

	const handleCreatePreBriefing = async (values: FieldValues) => {
		saveFormState()

		await useIsValidFormField({
			form,
			fields: values as never,
			setData: (() => {}) as never,
			nextStep: async () => {
				await submitPreBriefing(values)
			}
		})
	}

	const submitPreBriefing = async (values: FieldValues): Promise<void> => {
		setIsSubmitting(true)

		try {
			const currentState = usePreBriefingFormStore.getState()

			const mergedData: SendPreBriefing = {
				projectType: currentState.contractType as SendPreBriefing["projectType"],
				paymentMethod: currentState.paymentMethod as SendPreBriefing["paymentMethod"],
				hasInstallments: currentState.hasInstallments,
				installments: currentState.hasInstallments ? Number(currentState.installments) : 1,
				entryValue: currentState.entryValue,
				clientName: currentState.clientName,
				nacionality: currentState.nacionality as SendPreBriefing["nacionality"],
				email: currentState.email,
				phone: currentState.phone,
				bussinessDocumentType: currentState.bussinessDocumentType as SendPreBriefing["bussinessDocumentType"],
				bussinessDocumentNumber: currentState.bussinessDocumentNumber,
				segment: currentState.segment as SendPreBriefing["segment"],
				bussinessName: currentState.bussinessName,
				programType: currentState.programType as SendPreBriefing["programType"],
				contractDate: dateToISO(currentState.contractDate as string | Date) ?? "",
				paymentDate: dateToISO(currentState.paymentDate as string | Date) ?? "",
				leadSource: values.leadSource as string,
				leadArrivalDate: dateToISO(values.leadArrivalDate as string | Date) ?? "",
				meetingLink: values.meetingLink as string
			}

			await savePreBriefing(mergedData)
			
			// Clear form store on success
			formStore.setFormState({
				contractType: "",
				paymentMethod: "",
				entryValue: "",
				installments: "",
				hasInstallments: false,
				clientName: "",
				nacionality: "",
				email: "",
				phone: "",
				bussinessDocumentType: "",
				bussinessDocumentNumber: "",
				segment: "",
				bussinessName: "",
				programType: "",
				contractDate: undefined,
				paymentDate: undefined,
				leadSource: "",
				leadArrivalDate: undefined,
				meetingLink: ""
			})

			toast.success("Pré-briefing cadastrado com sucesso!")
			router.replace("/comercial")
		} catch {
			toast.error("Erro ao cadastrar pré-briefing. Tente novamente.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form
			formSchema={formSchema}
			urlPath={urlPath}
			form={form}
			prevStep={handlePrevStep}
			nextStep={handleCreatePreBriefing}
			actualStep={actualStep}
			percentageProgress={percentageProgress}
			formContent={
				<>
					<Controller
						name="leadSource"
						control={form.control}
						render={() => (
							<Field>
								<DropdownMenu
									form={form}
									name="leadSource"
									label="Origem do Lead"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[{ label: "Prospecção Ativa", value: "ACTIVE_PROSPECTING" }]}
								/>
							</Field>
						)}
					/>
					<DatePicker form={form} formSchema={formSchema} canBeFuture fieldName="leadArrivalDate" label="Data de chegada do Lead" />
					<p className="text-[#737373]">Informe neste campo a data em que o lead chegou no Funil</p>
					<Controller
						name="meetingLink"
						control={form.control}
						render={({ field }) => (
							<Field>
								<FieldLabel>Link da reunião</FieldLabel>
								<Input {...field} maxLength={155} placeholder="URL" disabled={isSubmitting} />
								<FieldError>{firstErrorKey === "meetingLink" && String(form.formState.errors.meetingLink?.message)}</FieldError>
							</Field>
						)}
					/>
				</>
			}
		/>
	)
}

export default LeadInfo
