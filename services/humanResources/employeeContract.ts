import api from "@/lib/api"
import { EmployeeContract } from "@/types/services/humanResources/employeeContract"
import { defaultRoute } from "./defaultRoute"

export const findAllEmployeeContracts = async (): Promise<EmployeeContract[]> => {
	return (await api.get(defaultRoute + "/allEmployeeContract")).data
}

export const findEmployeeContractById = async (id: string): Promise<EmployeeContract> => {
	return (await api.get(defaultRoute + "/getEmployeeContractById/" + id)).data
}

export const createEmployeeContract = async (payload: EmployeeContract): Promise<EmployeeContract> => {
	return (await api.post(defaultRoute + "/saveEmployeeContract", payload)).data
}

export const updateEmployeeContract = async (id: string, payload: EmployeeContract): Promise<EmployeeContract> => {
	return (await api.put(defaultRoute + "/editEmployeeContract/" + id, payload)).data
}

export const deleteEmployeeContract = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteEmployeeContract/" + id)).data
}
