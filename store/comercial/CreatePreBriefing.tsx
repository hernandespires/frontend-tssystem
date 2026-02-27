import { PreBriefing, SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { create } from "zustand"

type PreBriefingStore = { allPreBriefings: PreBriefing[]; addPreBriefing: (preBriefing: SendPreBriefing) => void }

export const usePreBriefingStore = create<PreBriefingStore>((set) => ({
	allPreBriefings: [],
	addPreBriefing: (preBriefing) =>
		set((state) => ({
			allPreBriefings: [
				{
					id: "test",
					projectType: "",
					paymentMethod: "",
					hasInstallments: false,
					installments: 0,
					entryValue: 0,
					clientName: "",
					nacionality: "",
					email: "",
					phone: "",
					address: "",
					documentType: "",
					documentNumber: "",
					segment: "",
					bussinessName: "",
					programType: "",
					programPeriod: "",
					projectStartDate: "",
					contractDate: "",
					paymentDate: "",
					leadSource: "",
					leadArrivalDate: "",
					meetingLink: ""
				}
			]
		}))
}))
