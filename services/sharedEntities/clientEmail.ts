import api from "@/lib/api"
import { ClientEmail } from "@/types/services/sharedEntities/clientEmail"
import { defaultRoute } from "./defaultRoute"

export const findAllClientEmails = async (): Promise<ClientEmail[]> => {
	return (await api.get(defaultRoute + "/allClientEmail")).data
}

export const findClientEmailById = async (id: string): Promise<ClientEmail> => {
	return (await api.get(defaultRoute + "/getClientEmail/" + id)).data
}

export const createClientEmail = async (payload: ClientEmail): Promise<ClientEmail> => {
	return (await api.post<ClientEmail>(defaultRoute + "/saveClientEmail", payload)).data
}

export const updateClientEmail = async (id: string, payload: ClientEmail): Promise<ClientEmail> => {
	return (await api.put<ClientEmail>(defaultRoute + "/editClientEmail/" + id, payload)).data
}

export const deleteClientEmail = async (id: string): Promise<void> => {
	await api.delete<ClientEmail>(defaultRoute + "/deleteClientEmail/" + id)
}
