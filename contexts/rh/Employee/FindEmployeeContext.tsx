import { FindEmployeeContextTypes } from "@/types/contexts/rh/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

export const FindEmployeeContext =
  createContext<FindEmployeeContextTypes | null>(null);

export const FindEmployeeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [employeeFound, setEmployeeFound] = useState<Employee | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("employeeFound")
      return stored ? JSON.parse(stored) : null
    }
    return null
  })

  useEffect(() => {
    if (employeeFound) {
      localStorage.setItem(
        "employeeFound",
        JSON.stringify(employeeFound)
      )
    } else {
      localStorage.removeItem("employeeFound")
    }
  }, [employeeFound])

  return (
    <FindEmployeeContext.Provider
      value={{ employeeFound, setEmployeeFound }}
    >
      {children}
    </FindEmployeeContext.Provider>
  )
}

export const useFindEmployeeContext = () => {
  const ctx = useContext(FindEmployeeContext)
  if (!ctx) throw new Error("useFindEmployeeContext must be used within FindEmployeeProvider")
  return ctx
}