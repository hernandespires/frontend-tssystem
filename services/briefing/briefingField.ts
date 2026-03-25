import api from "@/lib/api"
import { BriefingField } from "@/types/services/briefing/briefingField"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingField = async (): Promise<BriefingField[]> => {
	return (await api.get(defaultRoute + "/allBriefingField")).data
}

export const findBriefingFieldById = async (id: string): Promise<BriefingField> => {
	return (await api.get(defaultRoute + "/getBriefingField/" + id)).data
}

export const createBriefingField = async (payload: BriefingField): Promise<BriefingField> => {
	return (await api.post(defaultRoute + "/saveBriefingField", payload)).data
}

export const updateBriefingField = async (id: string, payload: BriefingField): Promise<BriefingField> => {
	return (await api.put(defaultRoute + "/editBriefingField/" + id, payload)).data
}

export const deleteBriefingField = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingField/" + id)).data
}
