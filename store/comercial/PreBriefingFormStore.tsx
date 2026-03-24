import { create } from "zustand"

type PreBriefingFormState = {
	// Step 1 - ProjectType
	contractType: string

	// Step 2 - PaymentMethod
	paymentMethod: string
	entryValue: string
	installments: string
	hasInstallments: boolean

	// Step 3 - ClientData
	clientName: string
	nacionality: string
	email: string
	phone: string

	// Step 4 - CompanyData
	bussinessDocumentType: string
	bussinessDocumentNumber: string
	segment: string
	bussinessName: string

	// Step 5 - ScheduleDates
	programType: string
	contractDate: Date | undefined
	paymentDate: Date | undefined

	// Step 6 - LeadInfo
	leadSource: string
	leadArrivalDate: Date | undefined
	meetingLink: string

	setFormState: (state: Partial<Omit<PreBriefingFormState, "setFormState">>) => void
}

export const usePreBriefingFormStore = create<PreBriefingFormState>((set) => ({
	// Step 1
	contractType: "",

	// Step 2
	paymentMethod: "",
	entryValue: "",
	installments: "",
	hasInstallments: false,

	// Step 3
	clientName: "",
	nacionality: "",
	email: "",
	phone: "",

	// Step 4
	bussinessDocumentType: "",
	bussinessDocumentNumber: "",
	segment: "",
	bussinessName: "",

	// Step 5
	programType: "",
	contractDate: undefined,
	paymentDate: undefined,

	// Step 6
	leadSource: "",
	leadArrivalDate: undefined,
	meetingLink: "",

	setFormState: (state) => set(state)
}))
