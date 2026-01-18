import { SendEmployee } from "@/types/services/rh/employee"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

interface CreateEmployeeContextType {
    personalInformation: SendEmployee
    setPersonalInformation: Dispatch<SetStateAction<SendEmployee>>
}

export const CreateEmployeeContext = createContext<CreateEmployeeContextType | null>(null)

export const CreateEmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [personalInformation, setPersonalInformation] = useState<SendEmployee>({
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
        documentation: ""
    })

    return <CreateEmployeeContext.Provider value={{ personalInformation, setPersonalInformation }}>{ children }</CreateEmployeeContext.Provider>
}