import api from "@/lib/api"
import { BriefingEmployee } from "@/types/services/briefing/briefingEmployee"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingEmployee = async (): Promise<BriefingEmployee[]> => {
	return (await api.get(defaultRoute + "/allBriefingEmployee")).data
}

export const findBriefingEmployeeById = async (id: string): Promise<BriefingEmployee> => {
	return (await api.get(defaultRoute + "/getBriefingEmployee/" + id)).data
}

export const createBriefingEmployee = async (payload: BriefingEmployee): Promise<BriefingEmployee> => {
	return (await api.post(defaultRoute + "/saveBriefingEmployee", payload)).data
}

export const updateBriefingEmployee = async (id: string, payload: BriefingEmployee): Promise<BriefingEmployee> => {
	return (await api.put(defaultRoute + "/editBriefingEmployee/" + id, payload)).data
}

export const deleteBriefingEmployee = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingEmployee/" + id)).data
}
