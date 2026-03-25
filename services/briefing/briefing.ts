import api from "@/lib/api"
import { Briefing } from "@/types/services/briefing/briefing"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefing = async (): Promise<Briefing[]> => {
	return (await api.get(defaultRoute + "/allBriefing")).data
}

export const findBriefingById = async (id: string): Promise<Briefing> => {
	return (await api.get(defaultRoute + "/getBriefing/" + id)).data
}

export const createBriefing = async (payload: Briefing): Promise<Briefing> => {
	return (await api.post(defaultRoute + "/saveBriefing", payload)).data
}

export const updateBriefing = async (id: string, payload: Briefing): Promise<Briefing> => {
	return (await api.put(defaultRoute + "/editBriefing/" + id, payload)).data
}

export const deleteBriefing = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefing/" + id)).data
}
