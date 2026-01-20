import { SendEmployee } from "@/types/services/rh/employee"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

interface CreateEmployeeContextType {
    employeeInformations: SendEmployee
    setEmployeeInformations: Dispatch<SetStateAction<SendEmployee>>
}

export const CreateEmployeeContext = createContext<CreateEmployeeContextType | null>(null)

export const CreateEmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [employeeInformations, setEmployeeInformations] = useState<SendEmployee>({
        name: "", 
        birthday: null, 
        civilState: "", 
        nacionality: "", 
        rg: "", 
        cpf: "", 
        email: "", 
        motherName: "", 
        phone: "", 
        city: "", 
        postalCode: "", 
        street: "", 
        neighborhood: "", 
        workCard: "", 
        pisPasep: "", 
        typeEmployment: "",
        laborModality: "",
        laborScale: "",
        admissionDate: "",
        salary: "",
        residentialProve: "",
        reservist: false,
        documentation: "",
        bank: "",
        agency: "",
        account: "",
        pix: "",
        transportationVoucher: false,
        cnpjTransportationVoucher: "",
        monthlyAmount: "",
        additionalDocuments: "",
        department: "",
        operation: "",
        level: ""
    })

    return <CreateEmployeeContext.Provider value={{ employeeInformations, setEmployeeInformations }}>{ children }</CreateEmployeeContext.Provider>
}