import { create } from "zustand"
import { findAllEmployees } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"

type AllEmployeesStore = {
  employees: Employee[]
  isLoading: boolean
  error: string | null
  fetchEmployees: () => Promise<void>
}

export const useAllEmployeesStore = create<AllEmployeesStore>()((set) => ({
  employees: [],
  isLoading: false,
  error: null,
  fetchEmployees: async () => {
    set({ isLoading: true, error: null })
    try {
      const employees = await findAllEmployees()
      set({ employees, isLoading: false })
    } catch {
      set({ error: "Erro ao buscar colaboradores", isLoading: false })
    }
  }
}))
