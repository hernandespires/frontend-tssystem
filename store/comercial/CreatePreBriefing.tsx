import { PreBriefing } from "@/types/services/comercial/preBriefing"
import { create } from "zustand"

type PreBriefingStore = { allPreBriefings: PreBriefing[]; addPreBriefing: (preBriefing: PreBriefing) => void }

export const usePreBriefingStore = create<PreBriefingStore>((set) => ({
	allPreBriefings: [],
	addPreBriefing: (preBriefing) =>
		set((state) => {
			const last = state.allPreBriefings[state.allPreBriefings.length - 1]

			if (!last) {
				return {
					allPreBriefings: [{ ...preBriefing }]
				}
			}

			return {
				allPreBriefings: [...state.allPreBriefings.slice(0, -1), { ...last, ...preBriefing }]
			}
		})
}))
