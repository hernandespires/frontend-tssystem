import { z, ZodAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { useContext } from "react"
import { formatterCurrencyBRL } from "@/utils/formatters/formatterCurrencyBRL"

export const useZodForm = <TSchema extends ZodAny>(schema: TSchema) => {    
    const { employeeFound } = useContext(FindEmployeeContext)

    return (
        useForm<z.infer<TSchema>>({ 
            resolver: zodResolver(schema), 
            defaultValues: { 
                name: employeeFound.name, 
                birthday: new Date(employeeFound.birthday), 
                civilState: employeeFound.civilState, 
                rg: employeeFound.rg, 
                cpf: employeeFound.cpf, 
                email: employeeFound.email, 
                motherName: employeeFound.motherName, 
                phone: employeeFound.phone, 
                city: employeeFound.city, 
                postalCode: employeeFound.postalCode, 
                street: employeeFound.street, 
                neighborhood: employeeFound.neighborhood,
                workCard: employeeFound.workCard,
                pisPasep: employeeFound.pisPasep,
                typeEmployment: employeeFound.typeEmployment,
                laborModality: employeeFound.laborModality,
                laborScale: employeeFound.laborScale,
                admissionDate: new Date(employeeFound.admissionDate),
                salary: formatterCurrencyBRL(String(employeeFound.salary)),
                // residentialProve: files?.residentialProve,
                reservist: employeeFound.reservist,
                documentation: employeeFound.documentation,
                bank: employeeFound.bank,
                agency: employeeFound.agency,
                account: employeeFound.account,
                pix: employeeFound.pix,
                transportationVoucher: employeeFound.transportationVoucher,
                cnpjTransportationVoucher: employeeFound.cnpjTransportationVoucher,
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