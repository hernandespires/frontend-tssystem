import api from "@/lib/api"
import { Origin } from "@/types/services/comercial/origin"
import { defaultRoute } from "./defaultRoute"

export const findAllOrigins = async (): Promise<Origin[]> => {
	return (await api.get(defaultRoute + "/allOrigin")).data
}

export const findOriginById = async (id: string): Promise<Origin> => {
	return (await api.get(defaultRoute + "/getOrigin/" + id)).data
}

export const createOrigin = async (payload: Origin): Promise<Origin> => {
	return (await api.post(defaultRoute + "/saveOrigin", payload)).data
}

export const updateOrigin = async (id: string, payload: Origin): Promise<Origin> => {
	return (await api.put(defaultRoute + "/editOrigin/" + id, payload)).data
}

export const deleteOrigin = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteOrigin/" + id)
}
