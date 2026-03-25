import api from "@/lib/api"
import { BriefingAccesses } from "@/types/services/briefing/briefingAccesses"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingAccesses = async (): Promise<BriefingAccesses[]> => {
	return (await api.get(defaultRoute + "/allBriefingAccesses")).data
}

export const findBriefingAccessesById = async (id: string): Promise<BriefingAccesses> => {
	return (await api.get(defaultRoute + "/getBriefingAccesses/" + id)).data
}

export const createBriefingAccesses = async (payload: BriefingAccesses): Promise<BriefingAccesses> => {
	return (await api.post(defaultRoute + "/saveBriefingAccesses", payload)).data
}

export const updateBriefingAccesses = async (id: string, payload: BriefingAccesses): Promise<BriefingAccesses> => {
	return (await api.put(defaultRoute + "/editBriefingAccesses/" + id, payload)).data
}

export const deleteBriefingAccesses = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingAccesses/" + id)).data
}
