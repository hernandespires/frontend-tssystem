import { ContractInstallment } from "@/types/services/financial/contractInstallment"
import { create } from "zustand"

type ContractInstallmentStore = {
	allContractInstallments: ContractInstallment[]
	addContractInstallment: (contractInstallment: ContractInstallment) => void
}

export const useContractInstallmentStore = create<ContractInstallmentStore>((set) => ({
	allContractInstallments: [],
	addContractInstallment: (contractInstallment) =>
		set((state) => {
			const last = state.allContractInstallments[state.allContractInstallments.length - 1]

			if (!last) {
				return { allContractInstallments: [{ ...contractInstallment }] }
			}

			return { allContractInstallments: [...state.allContractInstallments.slice(0, -1), { ...last, ...contractInstallment }] }
		})
}))
