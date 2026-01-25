import { SendEmployee } from "@/types/services/humanResources/employee"
import { Dispatch, SetStateAction } from "react"

export interface CreateEmployeeContextType { employeeData: SendEmployee, setEmployeeData: Dispatch<SetStateAction<SendEmployee>> }