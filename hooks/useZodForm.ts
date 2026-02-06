// import { z, ZodAny } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
// import { useContext } from "react"
// import { 
//     formatterBankAgencyAndAccount, formatterCNPJ, formatterCPF, formatterCurrencyBRL, formatterPhone, formatterPisPasep, formatterPix, formatterPostalCode, formatterRG
// } from "@/utils/formatters"
// import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"

// export const useZodForm = <TSchema extends ZodAny>(schema: TSchema) => {
//     const { employeeFound } = useContext(FindEmployeeContext)
//     const { employeeData } = useContext(CreateEmployeeContext)

//     return (
//         useForm<z.infer<TSchema>>({ 
//             resolver: zodResolver(schema), 
//             defaultValues: { 
//                 name: !employeeFound?.name ? employeeData?.name : employeeFound?.name,
//                 birthday: new Date(!employeeFound?.birthday ? employeeData?.birthday : employeeFound?.birthday),
//                 civilState: !employeeFound?.civilState ? employeeData?.civilState : employeeFound?.civilState,
//                 rg: formatterRG(!employeeFound?.rg ? employeeData?.rg : employeeFound?.rg), 
//                 cpf: formatterCPF(!employeeFound?.cpf ? employeeData?.cpf : employeeFound?.cpf), 
//                 email: !employeeFound?.email ? employeeData?.email : employeeFound?.email, 
//                 motherName: !employeeFound?.motherName ? employeeData?.motherName : employeeFound?.motherName, 
//                 phone: formatterPhone(!employeeFound?.phone ? employeeData?.phone : employeeFound?.phone),
//                 city: !employeeFound?.city ? employeeData?.city : employeeFound?.city, 
//                 postalCode: formatterPostalCode(!employeeFound?.postalCode ? employeeData?.postalCode : employeeFound?.postalCode),
//                 street: !employeeFound?.street ? employeeData?.street : employeeFound?.street, 
//                 neighborhood: !employeeFound?.neighborhood ? employeeData?.neighborhood : employeeFound?.neighborhood,
//                 workCard: formatterCPF(!employeeFound?.workCard ? employeeData?.workCard : employeeFound?.workCard),
//                 pisPasep: formatterPisPasep(!employeeFound?.pisPasep ? employeeData?.pisPasep : employeeFound?.pisPasep),
//                 typeEmployment: !employeeFound?.typeEmployment ? employeeData?.typeEmployment : employeeFound?.typeEmployment,
//                 laborModality: !employeeFound?.laborModality ? employeeData?.laborModality : employeeFound?.laborModality,
//                 laborScale: !employeeFound?.laborScale ? employeeData?.laborScale : employeeFound?.laborScale,
//                 admissionDate: new Date(!employeeFound?.admissionDate ? employeeData?.admissionDate : employeeFound?.admissionDate),
//                 salary: formatterCurrencyBRL(String(!employeeFound?.salary ? employeeData?.salary : employeeFound?.salary)),
//                 // residentialProve: files?.residentialProve,
//                 reservist: !employeeFound?.reservist ? employeeData?.reservist : employeeFound?.reservist,
//                 documentation: !employeeFound?.documentation ? employeeData?.documentation : employeeFound?.documentation,
//                 bank: !employeeFound?.bank ? employeeData?.bank : employeeFound?.bank,
//                 agency: formatterBankAgencyAndAccount(!employeeFound?.agency ? employeeData?.agency : employeeFound?.agency),
//                 account: formatterBankAgencyAndAccount(!employeeFound?.account ? employeeData?.account : employeeFound?.account),
//                 pix: formatterPix(!employeeFound?.pix ? employeeData?.pix : employeeFound?.pix),
//                 transportationVoucher: !employeeFound?.transportationVoucher ? employeeData?.transportationVoucher : employeeFound?.transportationVoucher,
//                 cnpjTransportationVoucher: formatterCNPJ(
//                     !employeeFound?.cnpjTransportationVoucher ? employeeData?.cnpjTransportationVoucher : employeeFound?.cnpjTransportationVoucher
//                 ),
//                 monthlyAmount: formatterCurrencyBRL(String(!employeeFound?.monthlyAmount ? employeeData?.monthlyAmount : employeeFound?.monthlyAmount)),
//                 additionalDocuments: !employeeFound?.additionalDocuments ? employeeData?.additionalDocuments : employeeFound?.additionalDocuments,
//                 department: !employeeFound?.department ? employeeData?.department : employeeFound?.department,
//                 operation: !employeeFound?.operation ? employeeData?.operation : employeeFound?.operation,
//                 level: !employeeFound?.level ? employeeData?.level : employeeFound?.level
//             }, 
//             criteriaMode: "firstError", 
//             mode: "onSubmit" 
//         })
//     )
// }

import { z, ZodAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { useContext } from "react"
import { 
    formatterBankAgencyAndAccount, formatterCNPJ, formatterCPF, formatterCurrencyBRL, 
    formatterPhone, formatterPisPasep, formatterPix, formatterPostalCode, formatterRG
} from "@/utils/formatters"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"

export const useZodForm = <TSchema extends ZodAny>(schema: TSchema) => {
    const { employeeFound } = useContext(FindEmployeeContext)
    const { employeeData } = useContext(CreateEmployeeContext)

    return useForm<z.infer<TSchema>>({ 
        resolver: zodResolver(schema), 
        defaultValues: { 
            name: !employeeFound?.name ? employeeData?.name : employeeFound?.name,
            birthday: new Date(!employeeFound?.birthday ? employeeData?.birthday : employeeFound?.birthday),
            sex: !employeeFound?.sex ? employeeData?.sex : employeeFound?.sex,
            civilState: !employeeFound?.civilState ? employeeData?.civilState : employeeFound?.civilState,
            rg: formatterRG(!employeeFound?.rg ? employeeData?.rg : employeeFound?.rg), 
            cpf: formatterCPF(!employeeFound?.cpf ? employeeData?.cpf : employeeFound?.cpf), 
            email: !employeeFound?.email ? employeeData?.email : employeeFound?.email, 
            motherName: !employeeFound?.motherName ? employeeData?.motherName : employeeFound?.motherName, 
            phone: formatterPhone(!employeeFound?.phone ? employeeData?.phone : employeeFound?.phone),
            city: !employeeFound?.city ? employeeData?.city : employeeFound?.city, 
            postalCode: formatterPostalCode(!employeeFound?.postalCode ? employeeData?.postalCode : employeeFound?.postalCode),
            street: !employeeFound?.street ? employeeData?.street : employeeFound?.street, 
            neighborhood: !employeeFound?.neighborhood ? employeeData?.neighborhood : employeeFound?.neighborhood,
            workCard: formatterCPF(!employeeFound?.workCard ? employeeData?.workCard : employeeFound?.workCard),
            pisPasep: formatterPisPasep(!employeeFound?.pisPasep ? employeeData?.pisPasep : employeeFound?.pisPasep),
            typeEmployment: !employeeFound?.typeEmployment ? employeeData?.typeEmployment : employeeFound?.typeEmployment,
            laborModality: !employeeFound?.laborModality ? employeeData?.laborModality : employeeFound?.laborModality,
            laborScale: !employeeFound?.laborScale ? employeeData?.laborScale : employeeFound?.laborScale,
            admissionDate: new Date(!employeeFound?.admissionDate ? employeeData?.admissionDate : employeeFound?.admissionDate),
            salary: formatterCurrencyBRL(String(!employeeFound?.salary ? employeeData?.salary : employeeFound?.salary)),
            // residentialProve: files?.residentialProve,
            reservist: !employeeFound?.reservist ? employeeData?.reservist : employeeFound?.reservist,
            documentation: !employeeFound?.documentation ? employeeData?.documentation : employeeFound?.documentation,
            bank: !employeeFound?.bank ? employeeData?.bank : employeeFound?.bank,
            agency: formatterBankAgencyAndAccount(!employeeFound?.agency ? employeeData?.agency : employeeFound?.agency),
            account: formatterBankAgencyAndAccount(!employeeFound?.account ? employeeData?.account : employeeFound?.account),
            pix: formatterPix(!employeeFound?.pix ? employeeData?.pix : employeeFound?.pix),
            transportationVoucher: !employeeFound?.transportationVoucher ? employeeData?.transportationVoucher : employeeFound?.transportationVoucher,
            cnpjTransportationVoucher: formatterCNPJ(
                !employeeFound?.cnpjTransportationVoucher ? employeeData?.cnpjTransportationVoucher : employeeFound?.cnpjTransportationVoucher
            ),
            monthlyAmount: formatterCurrencyBRL(String(!employeeFound?.monthlyAmount ? employeeData?.monthlyAmount : employeeFound?.monthlyAmount)),
            additionalDocuments: employeeFound?.additionalDocuments ?? employeeData?.additionalDocuments ?? [],
            department: !employeeFound?.department ? employeeData?.department : employeeFound?.department,
            operation: !employeeFound?.operation ? employeeData?.operation : employeeFound?.operation,
            level: !employeeFound?.level ? employeeData?.level : employeeFound?.level
        }, 
        criteriaMode: "firstError", 
        mode: "onSubmit" 
    })
}