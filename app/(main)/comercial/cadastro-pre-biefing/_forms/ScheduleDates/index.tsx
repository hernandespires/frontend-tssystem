import Form from "@/components/Form"
import { useZodForm } from "@/hooks/useZodForm"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import { Controller, FieldValues } from "react-hook-form"
import { Field } from "@/components/ui/field"
import DropdownMenu from "@/components/Form/DropdownMenu"
import DatePicker from "@/components/Form/DatePicker"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { dateToISO } from "@/utils/dateToISO"

const ScheduleDates = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing } = usePreBriefingStore()
	const form = useZodForm(formSchema, "comercial")

	const handleNextStep = async (values: FieldValues) => {
		await useIsValidFormField({
			form,
			fields: {
				...values,
				projectStartDate: dateToISO(values.projectStartDate as string | Date),
				contractDate: dateToISO(values.contractDate as string | Date),
				paymentDate: dateToISO(values.paymentDate as string | Date)
			} as never,
			setData: addPreBriefing as never,
			nextStep
		})
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
						name="programPeriod"
						control={form.control}
						defaultValue={undefined}
						render={() => (
							<Field>
								<DropdownMenu
									id="programPeriod"
									form={form}
									name="programPeriod"
									label="Tempo de programa"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[{ label: "6 meses", value: "SIX_MONTHS" }]}
								/>
							</Field>
						)}
					/>
					<DatePicker form={form} formSchema={formSchema} fieldName="projectStartDate" label="Data de início do projeto" />
					<p className="text-[#737373]">Informe a data de quando o projeto ficou combinado de se inciar</p>
					<DatePicker form={form} formSchema={formSchema} canBeFuture fieldName="contractDate" label="Data do contrato" />
					<p className="text-[#737373]">Data que sairá no final do contrato (geralmente é o dia de hoje)</p>
					<DatePicker form={form} formSchema={formSchema} canBeFuture fieldName="paymentDate" label="Data de pagamento" />
					<p className="text-[#737373]">Informe a data de quando o cliente fará o pagamento</p>
				</>
			}
		/>
	)
}

export default ScheduleDates
