import RegistrationForm from "@/components/RegistrationForm"
import { useZodForm } from "@/hooks/useZodForm"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { formSchema } from "./formSchema"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { FormType } from "@/types/form"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { FieldValues } from "react-hook-form"
import StepProgressBar from "@/components/StepProgressBar"
import { Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import DropdownMenu from "@/components/Form/DropdownMenu"
import { formatterPhone } from "@/utils/formatters"

const ClientData = ({ nextStep, urlPath, prevStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing } = usePreBriefingStore()

	const form = useZodForm(formSchema, "comercial")
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	const handleNextStep = async (values: FieldValues) => {
		await useIsValidFormField({ form, fields: values as never, setData: addPreBriefing as never, nextStep })
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<section className="flex justify-center items-stretch w-230 py-3 self-center">
				<div className="w-full flex flex-col gap-y-3">
					<Controller
						name="clientName"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>Nome completo</FieldLabel>
								<Input {...field} maxLength={155} placeholder="Nome completo" />
								<FieldError>{firstErrorKey === "clientName" && String(form.formState.errors.clientName?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="nacionality"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<DropdownMenu
									id="nacionality"
									form={form}
									name="nacionality"
									label="Nacionalidade"
									schemaKeys={Object.keys(formSchema.shape)}
									options={[
										{ label: "Brasil", value: "BRAZILIAN" },
										{ label: "Estados Unidos", value: "AMERICAN" }
									]}
								/>
							</Field>
						)}
					/>
					<Controller
						name="email"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<FieldLabel htmlFor="email">E-mail</FieldLabel>
								<Input id="email" maxLength={155} placeholder="email@email.com" {...form.register("email")} />
								<FieldError>{firstErrorKey === "email" && String(form.formState.errors.email?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="phone"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field className="w-52.75">
								<FieldLabel htmlFor="phone">Telefone</FieldLabel>
								<Input
									{...field}
									id="phone"
									maxLength={19}
									placeholder="+55 (XX) XXXXX-XXXX"
									onChange={(event) => field.onChange(formatterPhone(event.target.value))}
								/>
								<FieldError>{firstErrorKey === "phone" && String(form.formState.errors.phone?.message)}</FieldError>
							</Field>
						)}
					/>
				</div>
			</section>
		</RegistrationForm>
	)
}

export default ClientData
