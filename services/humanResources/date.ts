import api from "@/lib/api"
import { DateEntity } from "@/types/services/humanResources/date"
import { defaultRoute } from "./defaultRoute"

export const findAllDates = async (): Promise<DateEntity[]> => {
	return (await api.get(defaultRoute + "/allDate")).data
}

export const findDateById = async (id: string): Promise<DateEntity> => {
	return (await api.get(defaultRoute + "/getDate/" + id)).data
}

export const createDate = async (payload: DateEntity): Promise<DateEntity> => {
	return (await api.post(defaultRoute + "/saveDate", payload)).data
}

export const updateDate = async (id: string, payload: DateEntity): Promise<DateEntity> => {
	return (await api.put(defaultRoute + "/editDate/" + id, payload)).data
}

export const deleteDate = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteDate/" + id)).data
}
