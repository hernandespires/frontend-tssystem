import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Employee } from "@/types/services/humanResources/employee"

type EmployeeStore = {
  employeeFound: Employee | null
  setEmployeeFound: (employee: Employee | null) => void
  clearEmployeeFound: () => void
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      employeeFound: null,
      setEmployeeFound: (employee) => set({ employeeFound: employee }),
      clearEmployeeFound: () => set({ employeeFound: null })
    }),
    { name: "employeeFound" }
  )
)
