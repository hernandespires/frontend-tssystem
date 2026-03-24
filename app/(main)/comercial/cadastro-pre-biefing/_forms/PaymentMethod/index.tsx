import RegistrationForm from "@/components/RegistrationForm"
import StepProgressBar from "@/components/StepProgressBar"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import DropdownMenu from "@/components/Form/DropdownMenu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Controller, FieldValues } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { formatterCurrencyBRL } from "@/utils/formatters"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { FormType } from "@/types/form"
import { useContractStore } from "@/store/financial/CreateContract"
import { useContractInstallmentStore } from "@/store/financial/CreateContractInstallment"
import { usePreBriefingFormStore } from "@/store/comercial/PreBriefingFormStore"
import { toast } from "sonner"

const PaymentMethod = ({ nextStep, urlPath, prevStep, actualStep, percentageProgress }: FormType) => {
	const { addContract } = useContractStore()
	const { addContractInstallment } = useContractInstallmentStore()
	const formStore = usePreBriefingFormStore()

	const [hasInstallments, setHasInstallments] = [
		formStore.hasInstallments,
		(value: boolean) => formStore.setFormState({ hasInstallments: value })
	] as const

	const form = useZodForm(formSchema, "comercial", {
		defaultValues: {
			paymentMethod: formStore.paymentMethod,
			entryValue: formStore.entryValue,
			installments: formStore.installments
		} as never
	})
	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	const saveFormState = () => {
		const values = form.getValues()
		formStore.setFormState({
			paymentMethod: values.paymentMethod ?? "",
			entryValue: values.entryValue ?? "",
			installments: values.installments ?? ""
		})
	}

	const handlePrevStep = () => {
		saveFormState()
		prevStep()
	}

	const handleNextStep = async (values: FieldValues) => {
		if (hasInstallments && (!values.installments || values.installments === "")) {
			toast.error("Informe a quantidade de parcelas para prosseguir com o pagamento parcelado.")
			return
		}

		saveFormState()
		addContract({ paymentMethod: values.paymentMethod, entryValue: values.entryValue } as never)

		if (hasInstallments) {
			await useIsValidFormField({
				form,
				fields: { installments: values.installments } as never,
				setData: addContractInstallment as never,
				nextStep
			})
		} else {
			await useIsValidFormField({
				form,
				fields: { entryValue: values.entryValue } as never,
				setData: addContract as never,
				nextStep
			})
		}
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={handlePrevStep} nextStep={handleNextStep}>
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
				<Field className="w-33.25">
					<div className="flex gap-x-2">
						<Checkbox checked={hasInstallments} onCheckedChange={() => setHasInstallments(!hasInstallments)} />
						<Label>Parcelado</Label>
					</div>
				</Field>
				<Controller
					name="installments"
					control={form.control}
					render={({ field }) => (
						<Field className="w-75.75">
							<Input
								{...field}
								value={field.value ?? ""}
								id="installments"
								inputMode="numeric"
								maxLength={2}
								placeholder="Qtde parcelas"
								disabled={!hasInstallments}
								className={!hasInstallments ? "blocked-field" : ""}
								onChange={(event) => {
									const value = event.target.value.replace(/\D/g, "")
									const num = Number(value)
									if (value === "" || (num >= 1 && num <= 12)) {
										field.onChange(value)
									}
								}}
							/>
							<FieldError>{firstErrorKey === "installments" && String(form.formState.errors.installments?.message)}</FieldError>
						</Field>
					)}
				/>
				<Controller
					name="entryValue"
					control={form.control}
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

