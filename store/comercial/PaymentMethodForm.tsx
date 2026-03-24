import { create } from "zustand"

type PaymentMethodFormState = {
	paymentMethod: string
	entryValue: string
	installments: string
	hasInstallments: boolean
	setFormState: (state: Partial<Omit<PaymentMethodFormState, "setFormState">>) => void
}

export const usePaymentMethodFormStore = create<PaymentMethodFormState>((set) => ({
	paymentMethod: "",
	entryValue: "",
	installments: "",
	hasInstallments: false,
	setFormState: (state) => set(state)
}))
