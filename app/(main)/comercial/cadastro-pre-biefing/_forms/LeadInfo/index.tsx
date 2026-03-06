import DropdownMenu from "@/components/Form/DropdownMenu"
import Form from "@/components/Form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useZodForm } from "@/hooks/useZodForm"
import { Controller } from "react-hook-form"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import DatePicker from "@/components/Form/DatePicker"
import { Input } from "@/components/ui/input"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { dateToISO } from "@/utils/dateToISO"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { createLead } from "@/services/comercial/lead"

const LeadInfo = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const { allPreBriefings, addPreBriefing } = usePreBriefingStore()

	const form = useZodForm(formSchema, "comercial")
	const firstErrorKey = useGetFirstErrorKey(form.formState.errors, Object.keys(formSchema.shape))

	const handleCreatePreBriefing = async (values: SendPreBriefing) => {
		try {
			const merge = { ...allPreBriefings, ...values }
			await createLead({ ...merge })
		} catch (err) {}

		await useIsValidFormField({ form, fields: { ...values, leadArrivalDate: dateToISO(values.leadArrivalDate) }, setData: addPreBriefing, nextStep })
	}

	console.log(allPreBriefings)

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
									id="leadSource"
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
								<Input {...field} maxLength={155} placeholder="URL" />
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
