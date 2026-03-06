import api from "@/lib/api"
import { defaultRoute } from "./defaultRoute"
import { Service } from "@/types/services/comercial/service"

export const findAllServices = async (): Promise<Service[]> => {
	return (await api.get(defaultRoute + "/allService")).data
}

export const findServiceById = async (id: string): Promise<Service> => {
	return (await api.get(defaultRoute + "/getService/" + id)).data
}

export const createService = async (payload: Service): Promise<Service> => {
	return (await api.post(defaultRoute + "/saveService", payload)).data
}

export const updateService = async (id: string, payload: Service): Promise<Service> => {
	return (await api.put(defaultRoute + "/editService/" + id, payload)).data
}

export const deleteService = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteService/" + id)
}
