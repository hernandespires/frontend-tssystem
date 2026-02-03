import { z, ZodAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { useContext } from "react"
import { 
    formatterBankAgencyAndAccount, formatterCNPJ, formatterCPF, formatterCurrencyBRL, formatterPhone, formatterPisPasep, formatterPix, formatterPostalCode, formatterRG
} from "@/utils/formatters"

export const useZodForm = <TSchema extends ZodAny>(schema: TSchema) => {
    const { employeeFound } = useContext(FindEmployeeContext)

    return (
        useForm<z.infer<TSchema>>({ 
            resolver: zodResolver(schema), 
            defaultValues: { 
                name: employeeFound.name, 
                birthday: new Date(employeeFound.birthday), 
                civilState: employeeFound.civilState, 
                rg: formatterRG(employeeFound.rg), 
                cpf: formatterCPF(employeeFound.cpf), 
                email: employeeFound.email, 
                motherName: employeeFound.motherName, 
                phone: formatterPhone(employeeFound.phone),
                city: employeeFound.city, 
                postalCode: formatterPostalCode(employeeFound.postalCode),
                street: employeeFound.street, 
                neighborhood: employeeFound.neighborhood,
                workCard: formatterCPF(employeeFound.workCard),
                pisPasep: formatterPisPasep(employeeFound.pisPasep),
                typeEmployment: employeeFound.typeEmployment,
                laborModality: employeeFound.laborModality,
                laborScale: employeeFound.laborScale,
                admissionDate: new Date(employeeFound.admissionDate),
                salary: formatterCurrencyBRL(String(employeeFound.salary)),
                // residentialProve: files?.residentialProve,
                reservist: employeeFound.reservist,
                documentation: employeeFound.documentation,
                bank: employeeFound.bank,
                agency: formatterBankAgencyAndAccount(employeeFound.agency),
                account: formatterBankAgencyAndAccount(employeeFound.account),
                pix: formatterPix(employeeFound.pix),
                transportationVoucher: employeeFound.transportationVoucher,
                cnpjTransportationVoucher: formatterCNPJ(employeeFound.cnpjTransportationVoucher),
                monthlyAmount: formatterCurrencyBRL(String(employeeFound.monthlyAmount)),
                additionalDocuments: employeeFound.additionalDocuments,
                department: employeeFound.department,
                operation: employeeFound.operation,
                level: employeeFound.level
            }, 
            criteriaMode: "firstError", 
            mode: "onSubmit" 
        })
    )
}