"use client"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useCreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { Employee, SendEmployee } from "@/types/services/humanResources/employee"
import { Controller, FieldValues } from "react-hook-form"
import { formatterBankAgencyAndAccount, formatterCNPJ, formatterCurrencyBRL, formatterPix } from "@/utils/formatters"
import { formatterBigDecimal } from "@/utils/formatters"
import { useFindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { useFindAllEmployeesContext } from "@/contexts/rh/Employee/FindAllEmployeesContext"
import { handleConflictingValues } from "@/utils/handlers"
import dynamic from "next/dynamic"
import StepProgressBar from "@/components/StepProgressBar"
import { FormType } from "@/types/form"

const BankDetails = ({ urlPath, prevStep, actualStep, percentageProgress, nextStep }: FormType) => {
	const { employeeData, setEmployeeData } = useCreateEmployeeContext()
	const { employeeFound } = useFindEmployeeContext()
	const { allEmployeesDataFound } = useFindAllEmployeesContext()

	const [transportationVoucherDocumentationVisibility, setTransportationVoucherDocumentationVisibility] = useState<boolean>(false)

	const form = useZodForm(formSchema, "rh")

	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	useEffect(() => {
		employeeData.transportationVoucher && setTransportationVoucherDocumentationVisibility(employeeData.transportationVoucher)
		employeeFound?.transportationVoucher && setTransportationVoucherDocumentationVisibility(employeeFound.transportationVoucher)
	}, [employeeFound, employeeData])

	const handleNextStep = (values: FieldValues) => {
		const typedValues = values as SendEmployee
		const conflictFieldMessages: Partial<Record<keyof Employee, string>> = { account: "Conta", pix: "Chave pix" }

		if (
			["account", "pix"].some((field) =>
				handleConflictingValues(
					employeeFound,
					allEmployeesDataFound,
					field as keyof Employee,
					(typedValues as unknown as Record<string, string>)[field],
					conflictFieldMessages as Record<keyof Employee, string>
				)
			)
		)
			return

		const monthlyRaw = typedValues.monthlyAmount
		const monthlyStr = monthlyRaw != null ? String(monthlyRaw) : ""

		useIsValidFormField({
			form,
			fields: { ...typedValues, monthlyAmount: formatterBigDecimal(monthlyStr) } as never,
			setData: setEmployeeData as never,
			nextStep
		})
	}

	const DropdownMenu = dynamic(() => import("../../../../../../../components/Form/DropdownMenu"), { ssr: false })

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<div className="flex items-stretch gap-22.5 h-112 px-38.75 py-3">
				<div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
					<DropdownMenu
						form={form}
						name="bank"
						label="Banco"
						schemaKeys={Object.keys(formSchema.shape)}
						options={[
							{ label: "Santander", value: "SANTANDER" },
							{ label: "Sicred", value: "SICRED" },
							{ label: "Banco do Brasil", value: "BANCO_DO_BRASIL" }
						]}
					/>
					<Controller
						name="agency"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel htmlFor="agency">Agência</FieldLabel>
								<Input
									{...field}
									id="agency"
									maxLength={6}
									placeholder="XXXX"
									onChange={(event) => field.onChange(formatterBankAgencyAndAccount(event.target.value))}
								/>
								<FieldError>{firstErrorKey === "agency" && String(form.formState.errors.agency?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="account"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel htmlFor="account">Conta</FieldLabel>
								<Input
									{...field}
									id="account"
									maxLength={6}
									placeholder="XXXX-X"
									onChange={(event) => field.onChange(formatterBankAgencyAndAccount(event.target.value))}
								/>
								<FieldError>{firstErrorKey === "account" && String(form.formState.errors.account?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="pix"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel htmlFor="pix">Chave Pix</FieldLabel>
								<Input
									{...field}
									id="pix"
									maxLength={155}
									placeholder="email / documento / celular"
									onChange={(event) => field.onChange(formatterPix(event.target.value))}
								/>
								<FieldError>{firstErrorKey === "pix" && String(form.formState.errors.pix?.message)}</FieldError>
							</Field>
						)}
					/>
				</div>
				<div>
					<Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
				</div>
				<div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
					<Controller
						name="transportationVoucher"
						control={form.control}
						defaultValue={false}
						render={({ field }) => (
							<Field>
								<div className="flex gap-2">
									<Checkbox
										id="transportationVoucher"
										checked={field.value}
										onCheckedChange={(isChecked) => {
											setTransportationVoucherDocumentationVisibility(Boolean(isChecked))
											field.onChange(isChecked)
										}}
									/>
									<Label htmlFor="transportationVoucher">Vale Transporte</Label>
								</div>
							</Field>
						)}
					/>
					<Controller
						name="cnpjTransportationVoucher"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field className={transportationVoucherDocumentationVisibility ? "flex" : "hidden"}>
								<FieldLabel htmlFor="cnpjTransportationVoucher">CNPJ - Empresa vale transporte</FieldLabel>
								<Input
									{...field}
									id="cnpjTransportationVoucher"
									inputMode="numeric"
									maxLength={18}
									placeholder="XX.XXX.XXX/XXXX-XX"
									onChange={(event) => field.onChange(formatterCNPJ(event.target.value))}
								/>
								<FieldError>
									{firstErrorKey === "cnpjTransportationVoucher" && String(form.formState.errors.cnpjTransportationVoucher?.message)}
								</FieldError>
							</Field>
						)}
					/>
					<Field className={transportationVoucherDocumentationVisibility ? "flex" : "hidden"}>
						<FieldLabel htmlFor="monthlyAmount">Valor mensal</FieldLabel>
						<Controller
							control={form.control}
							name="monthlyAmount"
							defaultValue=""
							render={({ field }) => (
								<Input
									{...field}
									id="monthlyAmount"
									inputMode="numeric"
									maxLength={13}
									placeholder="R$ 0000,00"
									onChange={(event) => field.onChange(formatterCurrencyBRL(event.target.value))}
								/>
							)}
						/>
						<FieldError>{firstErrorKey === "monthlyAmount" && String(form.formState.errors.monthlyAmount?.message)}</FieldError>
					</Field>
				</div>
			</div>
		</RegistrationForm>
	)
}

export default BankDetails
