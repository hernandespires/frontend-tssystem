import RegistrationForm from "@/components/RegistrationForm"
import StepProgressBar from "@/components/StepProgressBar"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { Dispatch, SetStateAction } from "react"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { Field } from "@/components/ui/field"
import DropdownMenu from "@/app/(main)/(rh)/rh/cadastro-colaborador/_forms/components/DropdownMenu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Controller } from "react-hook-form"

const PaymentMethod = ({
	urlPath,
	prevStep,
	nextStep,
	actualStep,
	percentageProgress
}: {
	urlPath: { name: string; route: string }[]
	prevStep: () => void | string
	nextStep: Dispatch<SetStateAction<number>>
	actualStep: number
	percentageProgress: number
}) => {
	const form = useZodForm(formSchema, "comercial")
	const { addPreBriefing } = usePreBriefingStore()

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
					render={({ field }) => (
						<Field>
							<DropdownMenu
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
					name="reservist"
					control={form.control}
					render={({ field }) => (
						<Field className="w-33.25">
							<div className="flex gap-2">
								<Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
								<Label>Parcelado</Label>
							</div>
						</Field>
					)}
				/>
				<Controller
					name="paymentMethod"
					control={form.control}
					render={({ field }) => (
						<Field className="w-75.75">
							<DropdownMenu
								className={`gap-0 ${"bg-[#737373]"}`}
								schemaKeys={Object.keys(formSchema.shape)}
								name="paymentMethod"
								form={form}
								options={[
									{ label: "Pix", value: "PIX" },
									{ label: "Invoice", value: "INVOICE" },
									{ label: "Boleto", value: "PAYMENT_SLIP" }
								]}
								placeholder="Qtde parcelas"
							/>
						</Field>
					)}
				/>
			</section>
		</RegistrationForm>
	)
}

export default PaymentMethod
