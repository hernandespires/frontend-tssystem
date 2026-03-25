import api from "@/lib/api"
import { CommemorativeDate } from "@/types/services/humanResources/commemorativeDate"
import { defaultRoute } from "./defaultRoute"

export const findAllCommemorativeDates = async (): Promise<CommemorativeDate[]> => {
	return (await api.get(defaultRoute + "/allCommemorativeDate")).data
}

export const findCommemorativeDateById = async (id: string): Promise<CommemorativeDate> => {
	return (await api.get(defaultRoute + "/getCommemorativeDate/" + id)).data
}

export const createCommemorativeDate = async (payload: CommemorativeDate): Promise<CommemorativeDate> => {
	return (await api.post(defaultRoute + "/saveCommemorativeDate", payload)).data
}

export const updateCommemorativeDate = async (id: string, payload: CommemorativeDate): Promise<CommemorativeDate> => {
	return (await api.put(defaultRoute + "/editCommemorativeDate/" + id, payload)).data
}

export const deleteCommemorativeDate = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCommemorativeDate/" + id)).data
}
