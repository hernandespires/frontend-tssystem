import { Contract } from "@/types/services/financial/contract"
import { create } from "zustand"

type ContractStore = { allContracts: Contract[]; addContract: (contract: Contract) => void }

export const useContractStore = create<ContractStore>((set) => ({
	allContracts: [],
	addContract: (contract) =>
		set((state) => {
			const last = state.allContracts[state.allContracts.length - 1]

			if (!last) {
				return { allContracts: [{ ...contract }] }
			}

			return { allContracts: [...state.allContracts.slice(0, -1), { ...last, ...contract }] }
		})
}))
