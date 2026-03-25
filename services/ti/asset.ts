import api from "@/lib/api"
import { Asset, SendAsset } from "@/types/services/ti/asset"
import { defaultRoute } from "./defaultRoute"

export const findAllAssets = async (): Promise<Asset[]> => {
	return (await api.get(defaultRoute + "/allAsset")).data
}

export const findAssetById = async (id: string): Promise<Asset> => {
	return (await api.get(defaultRoute + "/getAsset/" + id)).data
}

export const createAsset = async (payload: SendAsset): Promise<Asset> => {
	return (await api.post(defaultRoute + "/saveAsset", payload)).data
}

export const updateAsset = async (id: string, payload: SendAsset): Promise<Asset> => {
	return (await api.put(defaultRoute + "/editAsset/" + id, payload)).data
}

export const deleteAsset = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteAsset/" + id)).data
}
