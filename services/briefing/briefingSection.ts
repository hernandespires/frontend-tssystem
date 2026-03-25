import api from "@/lib/api"
import { BriefingSection } from "@/types/services/briefing/briefingSection"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingSection = async (): Promise<BriefingSection[]> => {
	return (await api.get(defaultRoute + "/allBriefingSection")).data
}

export const findBriefingSectionById = async (id: string): Promise<BriefingSection> => {
	return (await api.get(defaultRoute + "/getBriefingSection/" + id)).data
}

export const createBriefingSection = async (payload: BriefingSection): Promise<BriefingSection> => {
	return (await api.post(defaultRoute + "/saveBriefingSection", payload)).data
}

export const updateBriefingSection = async (id: string, payload: BriefingSection): Promise<BriefingSection> => {
	return (await api.put(defaultRoute + "/editBriefingSection/" + id, payload)).data
}

export const deleteBriefingSection = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingSection/" + id)).data
}
