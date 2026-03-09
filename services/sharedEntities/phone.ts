import api from "@/lib/api"
import { Phone } from "@/types/services/sharedEntities/phone"
import { defaultRoute } from "./defaultRoute"

export const findAllPhones = async (): Promise<Phone[]> => {
	return (await api.get(defaultRoute + "/allPhone")).data
}

export const findPhoneById = async (id: string): Promise<Phone> => {
	return (await api.get(defaultRoute + "/getPhone/" + id)).data
}

export const createPhone = async (payload: Phone): Promise<Phone> => {
	return (await api.post<Phone>(defaultRoute + "/savePhone", payload)).data
}

export const updatePhone = async (id: string, payload: Phone): Promise<Phone> => {
	return (await api.put<Phone>(defaultRoute + "/editPhone/" + id, payload)).data
}

export const deletePhone = async (id: string): Promise<void> => {
	await api.delete<Phone>(defaultRoute + "/deletePhone/" + id)
}
