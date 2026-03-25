import api from "@/lib/api"
import { EmployeePhone } from "@/types/services/humanResources/employeePhone"
import { defaultRoute } from "./defaultRoute"

export const findAllEmployeePhones = async (): Promise<EmployeePhone[]> => {
	return (await api.get(defaultRoute + "/allEmployeePhone")).data
}

export const findEmployeePhoneById = async (id: string): Promise<EmployeePhone> => {
	return (await api.get(defaultRoute + "/getEmployeePhone/" + id)).data
}

export const createEmployeePhone = async (payload: EmployeePhone): Promise<EmployeePhone> => {
	return (await api.post(defaultRoute + "/saveEmployeePhone", payload)).data
}

export const updateEmployeePhone = async (id: string, payload: EmployeePhone): Promise<EmployeePhone> => {
	return (await api.put(defaultRoute + "/editEmployeePhone/" + id, payload)).data
}

export const deleteEmployeePhone = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteEmployeePhone/" + id)).data
}
