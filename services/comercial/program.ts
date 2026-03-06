import api from "@/lib/api"
import { defaultRoute } from "./defaultRoute"
import { Program } from "@/types/services/comercial/program"

export const findAllPrograms = async (): Promise<Program[]> => {
	return (await api.get(defaultRoute + "/allProgram")).data
}

export const findProgramById = async (id: string): Promise<Program> => {
	return (await api.get(defaultRoute + "/getProgram/" + id)).data
}

export const createProgram = async (payload: Program): Promise<Program> => {
	return (await api.post(defaultRoute + "/saveProgram", payload)).data
}

export const updateProgram = async (id: string, payload: Program): Promise<Program> => {
	return (await api.put(defaultRoute + "/editProgram/" + id, payload)).data
}

export const deleteProgram = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteProgram/" + id)
}
