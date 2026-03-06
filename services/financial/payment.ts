import api from "@/lib/api"
import { Payment } from "@/types/services/financial/payment"
import { defaultRoute } from "./defaultRoute"

export const findAllPayments = async (): Promise<Payment[]> => {
	return (await api.get(defaultRoute + "/allPayment")).data
}

export const findPaymentById = async (id: string): Promise<Payment> => {
	return (await api.get(defaultRoute + "/getPayment/" + id)).data
}

export const createPayment = async (payload: Payment): Promise<Payment> => {
	return (await api.post(defaultRoute + "/savePayment", payload)).data
}

export const updatePayment = async (id: string, payload: Payment): Promise<Payment> => {
	return (await api.put(defaultRoute + "/editPayment/" + id, payload)).data
}

export const deletePayment = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deletePayment/" + id)
}
