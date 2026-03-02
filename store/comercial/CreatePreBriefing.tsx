import { PreBriefing, SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { create } from "zustand"

type PreBriefingStore = { allPreBriefings: PreBriefing[]; addPreBriefing: (preBriefing: SendPreBriefing) => void }

export const usePreBriefingStore = create<PreBriefingStore>((set) => ({
	allPreBriefings: [],
	addPreBriefing: (preBriefing) =>
		set((state) => ({ allPreBriefings: [...state.allPreBriefings, { id: "9d2e98ad-3440-40ec-bd67-384db98c9566", ...preBriefing }] }))
}))
