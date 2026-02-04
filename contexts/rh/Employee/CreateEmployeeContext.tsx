import { CreateEmployeeContextTypes } from "@/types/contexts/rh/employee"
import { SendEmployee } from "@/types/services/humanResources/employee"
import { createContext, ReactNode, useState } from "react"

export const CreateEmployeeContext = createContext<CreateEmployeeContextTypes | null>(null)

export const CreateEmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [employeeData, setEmployeeData] = useState<SendEmployee>({    // testar deixando como valor default null
        name: "",
        birthday: "",
        civilState: "",
        // nacionality: "",
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
        additionalDocuments: [],
        department: "",
        operation: "",
        level: "",
        status: "ACTIVE",
        quitDate: ""
    })

    return <CreateEmployeeContext.Provider value={{ employeeData, setEmployeeData }}>{ children }</CreateEmployeeContext.Provider>
}