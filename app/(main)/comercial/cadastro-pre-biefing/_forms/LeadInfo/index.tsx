import DropdownMenu from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DropdownMenu"
import Form from "@/components/Form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useZodForm } from "@/hooks/useZodForm"
import { Controller } from "react-hook-form"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import DatePicker from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DatePicker"
import { Input } from "@/components/ui/input"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"

const LeadInfo = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const form = useZodForm(formSchema, "comercial")
	const firstErrorKey = useGetFirstErrorKey(form.formState.errors, Object.keys(formSchema.shape))

	return (
		<Form
			formSchema={formSchema}
			urlPath={urlPath}
			form={form}
			prevStep={prevStep}
			nextStep={nextStep}
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
					<Controller
						name="leadArrivalDate"
						control={form.control}
						defaultValue=""
						render={() => (
							<>
								<DatePicker form={form} formSchema={formSchema} canBeFuture fieldName="" label="Data de chegada do Lead" />
								<p className="text-[#737373]">Informe neste campo a data em que o lead chegou no Funil</p>
							</>
						)}
					/>
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
