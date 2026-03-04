import Form from "@/components/Form"
import { useZodForm } from "@/hooks/useZodForm"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import { Controller } from "react-hook-form"
import { Field } from "@/components/ui/field"
import DropdownMenu from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DropdownMenu"
import DatePicker from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DatePicker"

const ScheduleDates = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const form = useZodForm(formSchema, "comercial")

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
						name="programPeriod"
						control={form.control}
						defaultValue=""
						render={() => (
							<>
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
							</>
						)}
					/>
					<Controller
						name="projectStartDate"
						control={form.control}
						defaultValue=""
						render={() => (
							<>
								<DatePicker form={form} formSchema={formSchema} fieldName="" label="Data de início do projeto" />
								<p className="text-[#737373]">Informe a data de quando o projeto ficou combinado de se inciar</p>
							</>
						)}
					/>
					<Controller
						name="contractDate"
						control={form.control}
						defaultValue=""
						render={() => (
							<>
								<DatePicker form={form} formSchema={formSchema} canBeFuture fieldName="" label="Data do contrato" />
								<p className="text-[#737373]">Data que sairá no final do contrato (geralmente é o dia de hoje)</p>
							</>
						)}
					/>
					<Controller
						name="paymentDate"
						control={form.control}
						defaultValue=""
						render={() => (
							<>
								<DatePicker form={form} formSchema={formSchema} canBeFuture fieldName="" label="Data de pagamento" />
								<p className="text-[#737373]">Informe a data de quando o cliente fará o pagamento</p>
							</>
						)}
					/>
				</>
			}
		/>
	)
}

export default ScheduleDates
