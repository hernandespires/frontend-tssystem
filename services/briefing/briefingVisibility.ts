import api from "@/lib/api"
import { BriefingVisibility } from "@/types/services/briefing/briefingVisibility"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingVisibility = async (): Promise<BriefingVisibility[]> => {
	return (await api.get(defaultRoute + "/allBriefingVisibility")).data
}

export const findBriefingVisibilityById = async (id: string): Promise<BriefingVisibility> => {
	return (await api.get(defaultRoute + "/getBriefingVisibility/" + id)).data
}

export const createBriefingVisibility = async (payload: BriefingVisibility): Promise<BriefingVisibility> => {
	return (await api.post(defaultRoute + "/saveBriefingVisibility", payload)).data
}

export const updateBriefingVisibility = async (id: string, payload: BriefingVisibility): Promise<BriefingVisibility> => {
	return (await api.put(defaultRoute + "/editBriefingVisibility/" + id, payload)).data
}

export const deleteBriefingVisibility = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingVisibility/" + id)).data
}
