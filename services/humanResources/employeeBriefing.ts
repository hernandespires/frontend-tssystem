import api from "@/lib/api"
import { EmployeeBriefing } from "@/types/services/humanResources/employeeBriefing"
import { defaultRoute } from "./defaultRoute"

export const findAllEmployeeBriefings = async (): Promise<EmployeeBriefing[]> => {
	return (await api.get(defaultRoute + "/allEmployeeBriefing")).data
}

export const findEmployeeBriefingById = async (id: string): Promise<EmployeeBriefing> => {
	return (await api.get(defaultRoute + "/getEmployeeBriefing/" + id)).data
}

export const createEmployeeBriefing = async (payload: EmployeeBriefing): Promise<EmployeeBriefing> => {
	return (await api.post(defaultRoute + "/saveEmployeeBriefing", payload)).data
}

export const updateEmployeeBriefing = async (id: string, payload: EmployeeBriefing): Promise<EmployeeBriefing> => {
	return (await api.put(defaultRoute + "/editEmployeeBriefing/" + id, payload)).data
}

export const deleteEmployeeBriefing = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteEmployeeBriefing/" + id)).data
}
