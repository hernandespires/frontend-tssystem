import api from "@/lib/api"
import { OrganizationalUnit } from "@/types/services/humanResources/organizationalUnit"
import { defaultRoute } from "./defaultRoute"

export const findAllOrganizationalUnits = async (): Promise<OrganizationalUnit[]> => {
	return (await api.get(defaultRoute + "/allOrganizationalUnit")).data
}

export const findOrganizationalUnitById = async (id: string): Promise<OrganizationalUnit> => {
	return (await api.get(defaultRoute + "/getOrganizationalUnit/" + id)).data
}

export const createOrganizationalUnit = async (payload: OrganizationalUnit): Promise<OrganizationalUnit> => {
	return (await api.post(defaultRoute + "/saveOrganizationalUnit", payload)).data
}

export const updateOrganizationalUnit = async (id: string, payload: OrganizationalUnit): Promise<OrganizationalUnit> => {
	return (await api.put(defaultRoute + "/editOrganizationalUnit/" + id, payload)).data
}

export const deleteOrganizationalUnit = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteOrganizationalUnit/" + id)).data
}
