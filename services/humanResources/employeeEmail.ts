import api from "@/lib/api"
import { EmployeeEmail } from "@/types/services/humanResources/employeeEmail"
import { defaultRoute } from "./defaultRoute"

export const findAllEmployeeEmails = async (): Promise<EmployeeEmail[]> => {
	return (await api.get(defaultRoute + "/allEmployeeEmail")).data
}

export const findEmployeeEmailById = async (id: string): Promise<EmployeeEmail> => {
	return (await api.get(defaultRoute + "/getEmployeeEmail/" + id)).data
}

export const createEmployeeEmail = async (payload: EmployeeEmail): Promise<EmployeeEmail> => {
	return (await api.post(defaultRoute + "/saveEmployeeEmail", payload)).data
}

export const updateEmployeeEmail = async (id: string, payload: EmployeeEmail): Promise<EmployeeEmail> => {
	return (await api.put(defaultRoute + "/editEmployeeEmail/" + id, payload)).data
}

export const deleteEmployeeEmail = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteEmployeeEmail/" + id)).data
}
