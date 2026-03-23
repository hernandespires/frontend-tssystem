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
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { useContractStore } from "@/store/financial/CreateContract"
import { useContractInstallmentStore } from "@/store/financial/CreateContractInstallment"
import { savePreBriefing } from "@/services/comercial/preBriefing"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LeadInfo = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing, allPreBriefings } = usePreBriefingStore()
	const { allContracts } = useContractStore()
	const { allContractInstallments } = useContractInstallmentStore()
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const form = useZodForm(formSchema, "comercial")
	const firstErrorKey = useGetFirstErrorKey(form.formState.errors, Object.keys(formSchema.shape))

	const handleCreatePreBriefing = async (values: FieldValues) => {
		const leadFields = {
			...values,
			leadArrivalDate: dateToISO(values.leadArrivalDate as string | Date)
		}

		await useIsValidFormField({
			form,
			fields: leadFields as never,
			setData: addPreBriefing as never,
			nextStep: async () => {
				await submitPreBriefing(leadFields)
			}
		})
	}

	const submitPreBriefing = async (leadFields: Record<string, unknown>): Promise<void> => {
		setIsSubmitting(true)

		try {
			const preBriefingData = allPreBriefings[allPreBriefings.length - 1] ?? {}
			const contractData = allContracts[allContracts.length - 1] ?? {}
			const installmentData = allContractInstallments[allContractInstallments.length - 1] ?? {}

			const mergedData: SendPreBriefing = {
				...preBriefingData,
				...contractData,
				...installmentData,
				...leadFields
			} as SendPreBriefing

			await savePreBriefing(mergedData)
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
			prevStep={prevStep}
			nextStep={handleCreatePreBriefing}
			actualStep={actualStep}
			percentageProgress={percentageProgress}
			formContent={
				<>
					<Controller
						name="leadSource"
						control={form.control}
						defaultValue=""
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
						defaultValue=""
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
