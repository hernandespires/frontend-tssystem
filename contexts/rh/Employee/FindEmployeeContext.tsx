import { FindEmployeeContextTypes } from "@/types/contexts/rh/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { createContext, ReactNode, useState } from "react"

export const FindEmployeeContext = createContext<FindEmployeeContextTypes | null>(null)

export const FindEmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [employeeFound, setEmployeeFound] = useState<Employee>({
        id: "",
        name: "", 
        birthday: "", 
        civilState: "",
        // nacionality: "" | "BRAZILIAN" | "AMERICAN",
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
        agency: "",
        account: "",
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

    return <FindEmployeeContext.Provider value={{ employeeFound, setEmployeeFound }}>{ children }</FindEmployeeContext.Provider>
}