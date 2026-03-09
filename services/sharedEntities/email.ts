import api from "@/lib/api"
import { Email } from "@/types/services/sharedEntities/email"
import { defaultRoute } from "./defaultRoute"

export const findAllEmails = async (): Promise<Email[]> => {
	return (await api.get(defaultRoute + "/allEmail")).data
}

export const findEmailById = async (id: string): Promise<Email> => {
	return (await api.get(defaultRoute + "/getEmail/" + id)).data
}

export const createEmail = async (payload: Email): Promise<Email> => {
	return (await api.post<Email>(defaultRoute + "/saveEmail", payload)).data
}

export const updateEmail = async (id: string, payload: Email): Promise<Email> => {
	return (await api.put<Email>(defaultRoute + "/editEmail/" + id, payload)).data
}

export const deleteEmail = async (id: string): Promise<void> => {
	await api.delete<Email>(defaultRoute + "/deleteEmail/" + id)
}
