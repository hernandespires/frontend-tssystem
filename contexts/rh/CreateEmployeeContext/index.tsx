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
        birthday: "",
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
        salary: null,
        residentialProve: "",
        reservist: false,
        documentation: "",
        bank: "",
        agency: null,
        account: null,
        pix: "",
        transportationVoucher: false,
        cnpjTransportationVoucher: "",
        monthlyAmount: null,
        additionalDocuments: "",
        department: "",
        operation: "",
        level: "",
        status: "ACTIVE",
        quitDate: ""
    })

    return <CreateEmployeeContext.Provider value={{ employeeInformations, setEmployeeInformations }}>{ children }</CreateEmployeeContext.Provider>
}