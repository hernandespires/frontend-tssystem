import api from "@/lib/api"
import { BriefingFile } from "@/types/services/briefing/briefingFile"
import { defaultRoute } from "./defaultRoute"

export const findAllBriefingFile = async (): Promise<BriefingFile[]> => {
	return (await api.get(defaultRoute + "/allBriefingFile")).data
}

export const findBriefingFileById = async (id: string): Promise<BriefingFile> => {
	return (await api.get(defaultRoute + "/briefingFile/" + id)).data
}

export const createBriefingFile = async (payload: BriefingFile): Promise<BriefingFile> => {
	return (await api.post(defaultRoute + "/saveBriefingFile", payload)).data
}

export const updateBriefingFile = async (id: string, payload: BriefingFile): Promise<BriefingFile> => {
	return (await api.put(defaultRoute + "/editBriefingFile/" + id, payload)).data
}

export const deleteBriefingFile = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteBriefingFile/" + id)).data
}
