import api from "@/lib/api"
import { EmployeeAllocation } from "@/types/services/humanResources/employeeAllocation"
import { defaultRoute } from "./defaultRoute"

export const findAllEmployeeAllocations = async (): Promise<EmployeeAllocation[]> => {
	return (await api.get(defaultRoute + "/allEmployeeAllocation")).data
}

export const findEmployeeAllocationById = async (id: string): Promise<EmployeeAllocation> => {
	return (await api.get(defaultRoute + "/getEmployeeAllocation/" + id)).data
}

export const createEmployeeAllocation = async (payload: EmployeeAllocation): Promise<EmployeeAllocation> => {
	return (await api.post(defaultRoute + "/saveEmployeeAllocation", payload)).data
}

export const updateEmployeeAllocation = async (id: string, payload: EmployeeAllocation): Promise<EmployeeAllocation> => {
	return (await api.put(defaultRoute + "/editEmployeeAllocation/" + id, payload)).data
}

export const deleteEmployeeAllocation = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteEmployeeAllocation/" + id)).data
}
