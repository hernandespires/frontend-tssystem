import RegistrationForm from "@/components/RegistrationForm"
import { useZodForm } from "@/hooks/useZodForm"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { formSchema } from "./formSchema"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { FormType } from "@/types/form"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import StepProgressBar from "@/components/StepProgressBar"
import { Separator } from "@/components/ui/separator"
import { Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import DropdownMenu from "@/components/Form/DropdownMenu"
import { formatterCNPJ, formatterPhone } from "@/utils/formatters"

const ClientData = ({ nextStep, urlPath, prevStep, actualStep, percentageProgress }: FormType) => {
	const { allPreBriefings, addPreBriefing } = usePreBriefingStore()

	const form = useZodForm(formSchema, "comercial")
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	console.log(allPreBriefings)

	const handleNextStep = async (values: SendPreBriefing) => {
		await useIsValidFormField({ form, fields: values, setData: addPreBriefing, nextStep })
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<section className="flex justify-center items-stretch gap-x-22.5 w-230 py-3 self-center">
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
				<div>
					<Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
				</div>
				<div className="w-full flex flex-col gap-y-3">
					<Controller
						name="address"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>Endereço</FieldLabel>
								<Input {...field} maxLength={155} placeholder="Ex: 20 W 34th St., New York, NY 10001, Estados Unidos" />
								<FieldError>{firstErrorKey === "address" && String(form.formState.errors.address?.message)}</FieldError>
								<p className="text-[#737373]">Coloque o endereço da forma mais correta possível, pois essa informação vai no Contrato.</p>
							</Field>
						)}
					/>
					<Controller
						name="documentType"
						control={form.control}
						defaultValue=""
						render={() => (
							<Field>
								<DropdownMenu
									id="documentType"
									form={form}
									name="documentType"
									label="Tipo de documento"
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
						name="documentNumber"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>Número do documento</FieldLabel>
								<Input {...field} maxLength={18} placeholder="12312321312" onChange={(event) => field.onChange(formatterCNPJ(event.target.value))} />
								<FieldError>{firstErrorKey === "documentNumber" && String(form.formState.errors.documentNumber?.message)}</FieldError>
							</Field>
						)}
					/>
				</div>
			</section>
		</RegistrationForm>
	)
}

export default ClientData
