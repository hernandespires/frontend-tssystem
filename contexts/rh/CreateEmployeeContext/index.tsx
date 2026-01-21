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
        cpf: null,
        email: "", 
        motherName: "", 
        phone: null, 
        city: "",  
        postalCode: null, 
        street: "", 
        neighborhood: "", 
        workCard: null, 
        pisPasep: null, 
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
        cnpjTransportationVoucher: null,
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