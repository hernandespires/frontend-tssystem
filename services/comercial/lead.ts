import api from "@/lib/api"
import { Lead, SendLead } from "@/types/services/comercial/lead"

const defaultRoute = "/comercial"

export const findAllLeads = async (): Promise<Lead[]> => {
	return (await api.get(defaultRoute + "/allLead")).data
}

export const findLeadById = async (id: string): Promise<Lead> => {
	return (await api.get(defaultRoute + "/getLead/" + id)).data
}

export const createLead = async (payload: SendLead): Promise<Lead> => {
	return (await api.post(defaultRoute + "/saveLead", payload)).data
}

export const updateLead = async (id: string, payload: SendLead): Promise<Lead> => {
	return (await api.put(defaultRoute + "/editLead/" + id, payload)).data
}

export const deleteLead = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteLead/" + id)
}
