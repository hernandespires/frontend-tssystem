import { z } from "zod"
import type { $ZodType } from "zod/v4/core"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldValues, type UseFormProps, type UseFormReturn } from "react-hook-form"
import { useEmployeeStore } from "@/store/rh/employee/useEmployeeStore"
import { useEmployeeFormStore } from "@/store/rh/employee/useEmployeeFormStore"
import {
	formatterBankAgencyAndAccount,
	formatterCNPJ,
	formatterCPF,
	formatterCurrencyBRL,
	formatterPhone,
	formatterPisPasep,
	formatterPix,
	formatterPostalCode,
	formatterRG
} from "@/utils/formatters"

export const useZodForm = <TOutput extends FieldValues, TInput extends FieldValues, TSchema extends $ZodType<TOutput, TInput>>(
	schema: TSchema,
	department: string,
	overrideOptions?: Partial<UseFormProps<z.input<TSchema>>>
): UseFormReturn<FieldValues> => {
	const employeeFound = useEmployeeStore((s) => s.employeeFound)
	const employeeData = useEmployeeFormStore((s) => s.employeeData)

	const rhDefaultValues = {
		name: employeeFound?.name ?? employeeData?.name,
		birthday: new Date((employeeFound?.birthday ?? employeeData?.birthday) as string),
		sex: employeeFound?.sex ?? employeeData?.sex,
		civilState: employeeFound?.civilState ?? employeeData?.civilState,
		rg: formatterRG((employeeFound?.rg ?? employeeData?.rg) ?? ""),
		cpf: formatterCPF((employeeFound?.cpf ?? employeeData?.cpf) ?? ""),
		email: employeeFound?.email ?? employeeData?.email,
		motherName: employeeFound?.motherName ?? employeeData?.motherName,
		phone: formatterPhone((employeeFound?.phone ?? employeeData?.phone) ?? ""),
		city: employeeFound?.city ?? employeeData?.city,
		postalCode: formatterPostalCode((employeeFound?.postalCode ?? employeeData?.postalCode) ?? ""),
		street: employeeFound?.street ?? employeeData?.street,
		neighborhood: employeeFound?.neighborhood ?? employeeData?.neighborhood,
		workCard: formatterCPF((employeeFound?.workCard ?? employeeData?.workCard) ?? ""),
		pisPasep: formatterPisPasep((employeeFound?.pisPasep ?? employeeData?.pisPasep) ?? ""),
		typeEmployment: employeeFound?.typeEmployment ?? employeeData?.typeEmployment,
		laborModality: employeeFound?.laborModality ?? employeeData?.laborModality,
		laborScale: employeeFound?.laborScale ?? employeeData?.laborScale,
		admissionDate: new Date((employeeFound?.admissionDate ?? employeeData?.admissionDate) as string),
		salary: formatterCurrencyBRL(String(employeeFound?.salary ?? employeeData?.salary ?? "")),
		reservist: employeeFound?.reservist ?? employeeData?.reservist,
		documentation: employeeFound?.documentation ?? employeeData?.documentation,
		bank: employeeFound?.bank ?? employeeData?.bank,
		agency: formatterBankAgencyAndAccount(String(employeeFound?.agency ?? employeeData?.agency ?? "")),
		account: formatterBankAgencyAndAccount(String(employeeFound?.account ?? employeeData?.account ?? "")),
		pix: formatterPix((employeeFound?.pix ?? employeeData?.pix) ?? ""),
		transportationVoucher: employeeFound?.transportationVoucher ?? employeeData?.transportationVoucher,
		cnpjTransportationVoucher: formatterCNPJ((employeeFound?.cnpjTransportationVoucher ?? employeeData?.cnpjTransportationVoucher) ?? ""),
		monthlyAmount: formatterCurrencyBRL(String(employeeFound?.monthlyAmount ?? employeeData?.monthlyAmount ?? "")),
		additionalDocuments: employeeFound?.additionalDocuments ?? employeeData?.additionalDocuments ?? [],
		department: employeeFound?.department ?? employeeData?.department,
		operation: employeeFound?.operation ?? employeeData?.operation,
		level: employeeFound?.level ?? employeeData?.level
	}

	const baseOptions = {
		resolver: zodResolver(schema) as never,
		...(department === "rh" ? { defaultValues: rhDefaultValues as never } : {}),
		criteriaMode: "firstError" as const,
		mode: "onSubmit" as const
	}

	return useForm<z.input<TSchema>>(
		overrideOptions ? { ...baseOptions, ...overrideOptions } as never : baseOptions as never
	) as unknown as UseFormReturn<FieldValues>
}
