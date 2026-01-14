import { SendPersonalInformation } from "@/types/services/rh/employee"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

interface CreateEmployeeContextType {
    personalInformation: SendPersonalInformation
    setPersonalInformation: Dispatch<SetStateAction<SendPersonalInformation>>
}

export const CreateEmployeeContext = createContext<CreateEmployeeContextType | null>(null)

export const CreateEmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [personalInformation, setPersonalInformation] = useState<SendPersonalInformation>({
        employeeName: "", birthday: "", civilState: "", nacionality: "", rg: "", cpf: "", email: "", motherName: "", phone: "", city: "", postalCode: "", street: "", neighborhood: ""
    })

    return <CreateEmployeeContext.Provider value={{ personalInformation, setPersonalInformation }}>{ children }</CreateEmployeeContext.Provider>
}