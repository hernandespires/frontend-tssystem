"use client"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useEmployeeFormStore } from "@/store/rh/employee/useEmployeeFormStore"
import { useEmployeeStore } from "@/store/rh/employee/useEmployeeStore"
import { useAllEmployeesStore } from "@/store/rh/employee/useAllEmployeesStore"
import { useUploadStore } from "@/store/files/useUploadStore"
import { useZodForm } from "@/hooks/useZodForm"
import { Employee, SendEmployee } from "@/types/services/humanResources/employee"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { formSchema, baseFormSchema } from "./formSchema"
import { Controller, FieldValues } from "react-hook-form"
import { formatterCPF, formatterCurrencyBRL, formatterPisPasep, formatterBigDecimal } from "@/utils/formatters"
import ActualDocument from "../components/ActualDocument"
import { handleConflictingValues } from "@/utils/handlers"
import dynamic from "next/dynamic"
import StepProgressBar from "@/components/StepProgressBar"
import { FormType } from "@/types/form"

const LaborDocuments = ({ urlPath, prevStep, actualStep, percentageProgress, nextStep }: FormType) => {
	const { employeeData, setEmployeeData } = useEmployeeFormStore()
	const { employeeFound } = useEmployeeStore()
	const { employees } = useAllEmployeesStore()
	const { uploadData } = useUploadStore()

	const form = useZodForm(formSchema, "rh")

	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(baseFormSchema.shape))

	const DatePicker = dynamic(() => import("../../../../../../../components/Form/DatePicker"), { ssr: false })
	const DropdownMenu = dynamic(() => import("../../../../../../../components/Form/DropdownMenu"), { ssr: false })

	const watchedDocumentation = form.watch("documentation")
	const watchedResidential = form.watch("residentialProve")
	const watchedReservist = form.watch("reservist")

	const getDocumentName = (value: unknown) => {
		if (!value) return undefined
		if (value instanceof FileList && value.length > 0) return value[0].name
		if (typeof value === "string") return value

		return undefined
	}

	useEffect(() => {
		if (employeeFound?.documentation && employeeFound.documentation.length > 0) form.reset({ ...form.getValues(), reservist: true })
	}, [employeeFound?.documentation])

	useEffect(() => {
		if (uploadData.residentialProve) form.setValue("residentialProve", uploadData.residentialProve)
	}, [uploadData.residentialProve])

	useEffect(() => {
		if (uploadData.documentation) form.setValue("documentation", uploadData.documentation)
	}, [uploadData.documentation])

	useEffect(() => {
		if (employeeData?.documentation) form.setValue("documentation", employeeData.documentation)
		if (employeeData?.residentialProve) form.setValue("residentialProve", employeeData.residentialProve)
	}, [])

	useEffect(() => {
		if (!watchedReservist) {
			form.setValue("documentation", "")
			setEmployeeData({ documentation: "" })
		}
	}, [watchedReservist])

	const handleNextStep = (values: FieldValues) => {
		const typedValues = values as SendEmployee
		const conflictFieldMessages: Partial<Record<keyof Employee, string>> = { workCard: "Carteira de trabalho", pisPasep: "PIS/PASEP" }

		if (
			["workCard", "pisPasep"].some((field) =>
				handleConflictingValues(
					employeeFound,
					employees,
					field as keyof Employee,
					(typedValues as unknown as Record<string, string>)[field],
					conflictFieldMessages as Record<keyof Employee, string>
				)
			)
		)
			return

		const admissionRaw: unknown = typedValues.admissionDate
		const admissionISO =
			admissionRaw instanceof Date
				? admissionRaw.toISOString()
				: admissionRaw
					? new Date(admissionRaw as string).toISOString()
					: undefined

		const salaryRaw = typedValues.salary
		const salaryStr = salaryRaw != null ? String(salaryRaw) : ""

		useIsValidFormField({
			form,
			fields: {
				...typedValues,
				admissionDate: admissionISO,
				salary: formatterBigDecimal(salaryStr),
				residentialProve: getDocumentName(typedValues.residentialProve) ?? employeeData?.residentialProve ?? employeeFound?.residentialProve,
				documentation: getDocumentName(typedValues.documentation) ?? employeeData?.documentation ?? employeeFound?.documentation
			} as never,
			setData: setEmployeeData as never,
			nextStep
		})
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<div className="flex items-stretch gap-22.5 max-h-132 px-38.75 py-3 justify-center">
				<div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
					<Controller
						name="workCard"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>Carteira de Trabalho</FieldLabel>
								<Input {...field} maxLength={14} placeholder="XXX.XXX.XXX-XX" onChange={(e) => field.onChange(formatterCPF(e.target.value))} />
								<FieldError>{firstErrorKey === "workCard" && String(form.formState.errors.workCard?.message)}</FieldError>
							</Field>
						)}
					/>
					<Controller
						name="pisPasep"
						control={form.control}
						defaultValue=""
						render={({ field }) => (
							<Field>
								<FieldLabel>PIS/PASEP</FieldLabel>
								<Input
									{...field}
									maxLength={14}
									placeholder="XXX.XXXXX.XX-X"
									onChange={(event) => field.onChange(formatterPisPasep(event.target.value))}
								/>
								<FieldError>{firstErrorKey === "pisPasep" && String(form.formState.errors.pisPasep?.message)}</FieldError>
							</Field>
						)}
					/>
					<DropdownMenu
						form={form}
						name="typeEmployment"
						label="Tipo de Vínculo"
						schemaKeys={Object.keys(baseFormSchema.shape)}
						options={[
							{ label: "CLT", value: "CLT" },
							{ label: "CNPJ", value: "CNPJ" },
							{ label: "Freelance", value: "FREELANCE" }
						]}
					/>
					<DropdownMenu
						className="max-w-[68%]"
						form={form}
						name="laborModality"
						label="Modalidade"
						schemaKeys={Object.keys(baseFormSchema.shape)}
						options={[
							{ label: "Presencial", value: "IN_PERSON" },
							{ label: "Semi-presencial", value: "HYBRID" },
							{ label: "Home office", value: "HOME_OFFICE" }
						]}
					/>
					<DropdownMenu
						form={form}
						name="laborScale"
						label="Escala"
						schemaKeys={Object.keys(baseFormSchema.shape)}
						options={[
							{ label: "5x2", value: "_5X2" },
							{ label: "4x3", value: "_4X3" },
							{ label: "6x1", value: "_6X1" }
						]}
					/>
				</div>
				<div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
					<div className="w-full">
						<DatePicker form={form} formSchema={baseFormSchema} fieldName="admissionDate" label="Data de admisão" className="max-w-1/2" />
					</div>
					<Field>
						<FieldLabel>Salário</FieldLabel>
						<Controller
							name="salary"
							control={form.control}
							defaultValue=""
							render={({ field }) => (
								<Input
									{...field}
									inputMode="numeric"
									maxLength={13}
									placeholder="R$ 0000,00"
									onChange={(event) => field.onChange(formatterCurrencyBRL(event.target.value))}
								/>
							)}
						/>
						<FieldError>{firstErrorKey === "salary" && String(form.formState.errors.salary?.message)}</FieldError>
					</Field>
					<Field>
						<FieldLabel>Comprovante de residência</FieldLabel>
						<ActualDocument>
							{getDocumentName(watchedResidential) ?? employeeFound?.residentialProve ?? employeeData?.residentialProve ?? ""}
						</ActualDocument>
						<Input type="file" accept=".pdf,.png,.docx,.jpg" {...form.register("residentialProve")} />
					</Field>
					<Controller
						name="reservist"
						control={form.control}
						render={({ field }) => (
							<Field>
								<div className="flex gap-2">
									<Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
									<Label>Reservista</Label>
								</div>
							</Field>
						)}
					/>
					<Field className={!watchedReservist ? "hidden" : ""}>
						<FieldLabel>Documentação</FieldLabel>
						<ActualDocument>{getDocumentName(watchedDocumentation) ?? employeeFound?.documentation ?? employeeData?.documentation ?? ""}</ActualDocument>
						<Input type="file" accept=".pdf,.png,.docx,.jpg" {...form.register("documentation")} />
						<FieldError>{firstErrorKey === "documentation" && String(form.formState.errors.documentation?.message)}</FieldError>
					</Field>
				</div>
			</div>
		</RegistrationForm>
	)
}

export default LaborDocuments
