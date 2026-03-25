import api from "@/lib/api"
import { BriefingResponse } from "@/types/services/briefing/briefingResponse"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingResponse = async (): Promise<BriefingResponse[]> => {
	return (await api.get(defaultRoute + "/allBriefingResponse")).data
}

export const findBriefingResponseById = async (id: string): Promise<BriefingResponse> => {
	return (await api.get(defaultRoute + "/getBriefingResponse/" + id)).data
}

export const createBriefingResponse = async (payload: BriefingResponse): Promise<BriefingResponse> => {
	return (await api.post(defaultRoute + "/saveBriefingResponse", payload)).data
}

export const updateBriefingResponse = async (id: string, payload: BriefingResponse): Promise<BriefingResponse> => {
	return (await api.put(defaultRoute + "/editBriefingResponse/" + id, payload)).data
}

export const deleteBriefingResponse = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingResponse/" + id)).data
}
