// import { FindEmployeeContextTypes } from "@/types/contexts/rh/employee"
// import { Employee } from "@/types/services/humanResources/employee"
// import { createContext, ReactNode, useEffect, useState } from "react"

// export const FindEmployeeContext = createContext<FindEmployeeContextTypes | null>(null)

// export const FindEmployeeProvider = ({ children }: { children: ReactNode }) => {
//     const [employeeFound, setEmployeeFound] = useState<Employee>(() => {
//         if (typeof window !== "undefined") {
//             const stored = localStorage.getItem("employeeFound")
//             return stored ? JSON.parse(stored) : null
//         }
//         return {
//             id: "",
//             name: "", 
//             birthday: "", 
//             civilState: "",
//             // nacionality: "" | "BRAZILIAN" | "AMERICAN",
//             rg: "", 
//             cpf: "",
//             email: "", 
//             motherName: "", 
//             phone: "",
//             city: "", 
//             postalCode: "", 
//             street: "", 
//             neighborhood: "",
//             workCard: "",
//             pisPasep: "",
//             typeEmployment: "",
//             laborModality: "",
//             laborScale: "",
//             admissionDate: "",
//             salary: null,
//             residentialProve: "",
//             reservist: false,
//             documentation: "",
//             bank: "",
//             agency: "",
//             account: "",
//             pix: "",
//             transportationVoucher: false,
//             cnpjTransportationVoucher: "",
//             monthlyAmount: null,
//             additionalDocuments: "",
//             department: "",
//             operation: "",
//             level: "",
//             status: "ACTIVE",
//             quitDate: ""
//         }})

//     useEffect(() => {
//         if (employeeFound) localStorage.setItem("employeeFound", JSON.stringify(employeeFound))
//         else localStorage.removeItem("employeeFound")
//     }, [])

//     return <FindEmployeeContext.Provider value={{ employeeFound, setEmployeeFound }}>{ children }</FindEmployeeContext.Provider>
// }

import { FindEmployeeContextTypes } from "@/types/contexts/rh/employee";
import { Employee } from "@/types/services/humanResources/employee";
import { createContext, ReactNode, useEffect, useState } from "react";

export const FindEmployeeContext =
  createContext<FindEmployeeContextTypes | null>(null);

export const FindEmployeeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [employeeFound, setEmployeeFound] = useState<Employee | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("employeeFound");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    if (employeeFound) {
      localStorage.setItem(
        "employeeFound",
        JSON.stringify(employeeFound)
      );
    } else {
      localStorage.removeItem("employeeFound");
    }
  }, [employeeFound]); // 👈 ESSENCIAL

  return (
    <FindEmployeeContext.Provider
      value={{ employeeFound, setEmployeeFound }}
    >
      {children}
    </FindEmployeeContext.Provider>
  )
}