import api from "@/lib/api"
import { Client, SendClient } from "@/types/services/comercial/client"

const defaultRoute = "/comercial"

export const findAllClients = async (): Promise<Client[]> => {
	return (await api.get(defaultRoute + "/allClient")).data
}

export const findClientById = async (id: string): Promise<Client> => {
	return (await api.get(defaultRoute + "/getClient/" + id)).data
}

export const createClient = async (payload: SendClient): Promise<Client> => {
	return (await api.post(defaultRoute + "/saveClient", payload)).data
}

export const updateClient = async (id: string, payload: SendClient): Promise<Client> => {
	return (await api.put(defaultRoute + "/editClient/" + id, payload)).data
}

export const deleteClient = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteClient/" + id)
}
