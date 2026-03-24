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
import { usePreBriefingFormStore } from "@/store/comercial/PreBriefingFormStore"

const ScheduleDates = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing } = usePreBriefingStore()
	const formStore = usePreBriefingFormStore()

	const form = useZodForm(formSchema, "comercial", {
		defaultValues: {
			programType: formStore.programType,
			contractDate: formStore.contractDate,
			paymentDate: formStore.paymentDate
		} as never
	})

	const saveFormState = () => {
		const values = form.getValues()
		formStore.setFormState({
			programType: values.programType ?? "",
			contractDate: values.contractDate,
			paymentDate: values.paymentDate
		})
	}

	const handlePrevStep = () => {
		saveFormState()
		prevStep()
	}

	const handleNextStep = async (values: FieldValues) => {
		saveFormState()
		await useIsValidFormField({
			form,
			fields: {
				...values,
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
			prevStep={handlePrevStep}
			nextStep={handleNextStep}
			actualStep={actualStep}
			percentageProgress={percentageProgress}
			formContent={
				<>
					<Controller
						name="programType"
						control={form.control}
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
