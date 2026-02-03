// import { findAllEmployees } from "@/services/humanResources/employee"
// import { FindAllEmployeesContextTypes } from "@/types/contexts/rh/employee"
// import { Employee } from "@/types/services/humanResources/employee"
// import { createContext, ReactNode, useState } from "react"

// export const FindAllEmployeesContext = createContext<FindAllEmployeesContextTypes | null>(null)

// export const FindAllEmployeesProvideer = ({ children }: { children: ReactNode }) => {
//     findAllEmployees

//     const [allEmployeesDataFound, setAllEmployeesDataFound] = useState<Employee[]>([{ // fazer com que não seja possível alterar um os dados de todos os employees
//         id: "",
//         name: "", 
//         birthday: "", 
//         civilState: "",
//         // nacionality: "" | "BRAZILIAN" | "AMERICAN",
//         rg: "", 
//         cpf: "",
//         email: "", 
//         motherName: "", 
//         phone: "",
//         city: "", 
//         postalCode: "", 
//         street: "", 
//         neighborhood: "",
//         workCard: "",
//         pisPasep: "",
//         typeEmployment: "",
//         laborModality: "",
//         laborScale: "",
//         admissionDate: "",
//         salary: null,
//         residentialProve: "",
//         reservist: false,
//         documentation: "",
//         bank: "",
//         agency: "",
//         account: "",
//         pix: "",
//         transportationVoucher: false,
//         cnpjTransportationVoucher: "",
//         monthlyAmount: null,
//         additionalDocuments: "",
//         department: "",
//         operation: "",
//         level: "",
//         status: "ACTIVE",
//         quitDate: ""
//     }])

//     return <FindAllEmployeesContext.Provider value={{ allEmployeesDataFound, setAllEmployeesDataFound }}>{ children }</FindAllEmployeesContext.Provider>
// }

"use client"

import { findAllEmployees } from "@/services/humanResources/employee"
import { FindAllEmployeesContextTypes } from "@/types/contexts/rh/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { createContext, ReactNode, useEffect, useState } from "react"

export const FindAllEmployeesContext = createContext<FindAllEmployeesContextTypes | null>(null)

export const FindAllEmployeesProvideer = ({ children }: { children: ReactNode }) => {
    const [allEmployeesDataFound, setAllEmployeesDataFound] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEmployees = async () => {
            setIsLoading(true)
            setError(null)

            const response = await findAllEmployees()
            setAllEmployeesDataFound(response)
        }

            fetchEmployees()
    }, [])

    return <FindAllEmployeesContext.Provider value={{ allEmployeesDataFound, setAllEmployeesDataFound, isLoading, error }}>{ children }</FindAllEmployeesContext.Provider>
}