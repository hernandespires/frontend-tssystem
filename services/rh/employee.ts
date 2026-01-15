import api from "@/lib/api"
import { Employee, SendEmployee } from "@/types/services/rh/employee"

export const getAllEmployees = async (): Promise<Employee[]> => {
  return (await api.get("/rh/allEmployee")).data
}

export const getEmployeeById = async (id: string): Promise<Employee> => {
    return (await api.get(`/rh/getEmployee/${id}`)).data
}

export const createEmployee = async (payload: SendEmployee): Promise<Employee> => {
    return (await api.post<Employee>("/rh/saveEmployee", payload)).data
}

export const updateEmployee = async (id: string, payload: SendEmployee): Promise<Employee> => {
    return (await api.put<Employee>(`/rh/editEmployee/${id}`, payload)).data
}

export const deleteEmployee = async (id: string): Promise<Employee> => {
    return (await api.delete<Employee>(`/rh/deleteEmployee/${id}`)).data
}