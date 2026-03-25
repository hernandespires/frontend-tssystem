import api from "@/lib/api"
import { BriefingSynchronizationLog } from "@/types/services/briefing/briefingSynchronizationLog"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingSynchronizationLog = async (): Promise<BriefingSynchronizationLog[]> => {
	return (await api.get(defaultRoute + "/allBriefingSynchronizationLog")).data
}

export const findBriefingSynchronizationLogById = async (id: string): Promise<BriefingSynchronizationLog> => {
	return (await api.get(defaultRoute + "/getBriefingSynchronizationLog/" + id)).data
}

export const createBriefingSynchronizationLog = async (payload: BriefingSynchronizationLog): Promise<BriefingSynchronizationLog> => {
	return (await api.post(defaultRoute + "/saveBriefingSynchronizationLog", payload)).data
}

export const updateBriefingSynchronizationLog = async (id: string, payload: BriefingSynchronizationLog): Promise<BriefingSynchronizationLog> => {
	return (await api.put(defaultRoute + "/editBriefingSynchronizationLog/" + id, payload)).data
}

export const deleteBriefingSynchronizationLog = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingSynchronizationLog/" + id)).data
}
