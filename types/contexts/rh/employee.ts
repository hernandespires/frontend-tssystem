import { Employee, SendEmployee } from "@/types/services/humanResources/employee"
import { Dispatch, SetStateAction } from "react"

export interface CreateEmployeeContextTypes { employeeData: SendEmployee, setEmployeeData: Dispatch<SetStateAction<SendEmployee>> }

export interface FindEmployeeContextTypes { employeeFound: Employee, setEmployeeFound: Dispatch<SetStateAction<Employee>> }

// export interface FindAllEmployeesContextTypes { allEmployeesDataFound: Employee[], setAllEmployeesDataFound: Dispatch<SetStateAction<Employee[]>> }

export interface FindAllEmployeesContextTypes {
    allEmployeesDataFound: Employee[], setAllEmployeesDataFound: React.Dispatch<React.SetStateAction<Employee[]>>, isLoading: boolean, error: string | null
}