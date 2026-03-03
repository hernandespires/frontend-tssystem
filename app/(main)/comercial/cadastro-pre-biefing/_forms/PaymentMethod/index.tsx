import RegistrationForm from "@/components/RegistrationForm"
import StepProgressBar from "@/components/StepProgressBar"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { useState } from "react"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import DropdownMenu from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DropdownMenu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { formatterCurrencyBRL } from "@/utils/formatters"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { FormType } from "@/types/form"

const PaymentMethod = ({ nextStep, urlPath, prevStep, actualStep, percentageProgress }: FormType) => {
	const { addPreBriefing } = usePreBriefingStore()

	const [hasInstallments, setHasInstallments] = useState<boolean>(false)

	const form = useZodForm(formSchema, "comercial")
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	const handleNextStep = async (values: SendPreBriefing) => {
		await useIsValidFormField({ form, fields: values, setData: addPreBriefing, nextStep })
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<section className="w-115 self-center flex flex-wrap gap-3 justify-between items-center">
				<Controller
					name="paymentMethod"
					control={form.control}
					render={() => (
						<Field>
							<DropdownMenu
								id="paymentMethod"
								form={form}
								name="paymentMethod"
								label="Forma de pagamento"
								schemaKeys={Object.keys(formSchema.shape)}
								options={[
									{ label: "Pix", value: "PIX" },
									{ label: "Invoice", value: "INVOICE" },
									{ label: "Boleto", value: "PAYMENT_SLIP" }
								]}
							/>
						</Field>
					)}
				/>
				<Controller
					name="hasInstallments"
					control={form.control}
					render={({ field }) => (
						<Field className="w-33.25">
							<div className="flex gap-x-2">
								<Checkbox
									id="hasInstallments"
									checked={field.value}
									onCheckedChange={(checked) => {
										field.onChange(checked)
										setHasInstallments(!hasInstallments)
									}}
								/>
								<Label>Parcelado</Label>
							</div>
						</Field>
					)}
				/>
				<Controller
					name="installments"
					control={form.control}
					render={() => (
						<Field className="w-75.75">
							<DropdownMenu
								id="installments"
								form={form}
								schemaKeys={Object.keys(formSchema.shape)}
								className={`gap-0 ${!hasInstallments && "bg-[#737373]"}`}
								name="installments"
								disabled={!hasInstallments && true}
								placeholder="Qtde parcelas"
								options={[
									{ label: "Pix", value: "PIX" },
									{ label: "Invoice", value: "INVOICE" },
									{ label: "Boleto", value: "PAYMENT_SLIP" }
								]}
							/>
						</Field>
					)}
				/>
				<Controller
					name="entryValue"
					control={form.control}
					defaultValue=""
					render={({ field }) => (
						<Field>
							<FieldLabel>Valor do lançamento</FieldLabel>
							<Input
								{...field}
								inputMode="numeric"
								maxLength={13}
								placeholder="R$ 0000,00"
								onChange={(event) => field.onChange(formatterCurrencyBRL(event.target.value))}
							/>
							<FieldError>{firstErrorKey === "entryValue" && String(form.formState.errors.entryValue?.message)}</FieldError>
							<p className="text-[#737373]">Caso seja pagamento à vista, coloque o valor inteiro.</p>
						</Field>
					)}
				/>
			</section>
		</RegistrationForm>
	)
}

export default PaymentMethod
