import Form from "@/components/Form"
import { useZodForm } from "@/hooks/useZodForm"
import { formSchema } from "./formSchema"
import { FormType } from "@/types/form"
import { Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import DropdownMenu from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DropdownMenu"
import { Input } from "@/components/ui/input"

const CompanyData = ({ urlPath, prevStep, nextStep, actualStep, percentageProgress }: FormType) => {
	const form = useZodForm(formSchema, "comercial")
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

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
						name="segment"
						control={form.control}
						defaultValue=""
						render={() => (
							<>
								<Field>
									<DropdownMenu
										id="segment"
										form={form}
										name="segment"
										label="Forma de pagamento"
										schemaKeys={Object.keys(formSchema.shape)}
										options={[{ label: "Flooring", value: "FLOORING" }]}
									/>
								</Field>
							</>
						)}
					/>
					<Controller
						name="programType"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>Nome da empresa</FieldLabel>
								<Input {...field} maxLength={155} placeholder="TS System LLC" />
								<FieldError>{firstErrorKey === "programType" && String(form.formState.errors.programType?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="bussinessName"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<DropdownMenu
									id="bussinessName"
									form={form}
									name="bussinessName"
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
