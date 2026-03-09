import api from "@/lib/api"
import { ClientPhone } from "@/types/services/sharedEntities/clientPhone"
import { defaultRoute } from "./defaultRoute"

export const findAllClientPhones = async (): Promise<ClientPhone[]> => {
	return (await api.get(defaultRoute + "/allClientPhone")).data
}

export const findClientPhoneById = async (id: string): Promise<ClientPhone> => {
	return (await api.get(defaultRoute + "/getClientPhone/" + id)).data
}

export const createClientPhone = async (payload: ClientPhone): Promise<ClientPhone> => {
	return (await api.post<ClientPhone>(defaultRoute + "/saveClientPhone", payload)).data
}

export const updateClientPhone = async (id: string, payload: ClientPhone): Promise<ClientPhone> => {
	return (await api.put<ClientPhone>(defaultRoute + "/editClientPhone/" + id, payload)).data
}

export const deleteClientPhone = async (id: string): Promise<void> => {
	await api.delete<ClientPhone>(defaultRoute + "/deleteClientPhone/" + id)
}
