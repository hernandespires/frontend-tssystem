import api from "@/lib/api"
import { Employee, SendEmployee } from "@/types/services/rh/employee"

export const handleCreateEmployee = async (payload: SendEmployee): Promise<Employee> => {
    return (await api.post<Employee>("/rh/saveEmployee", payload)).data
}