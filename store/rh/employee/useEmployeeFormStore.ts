import { create } from "zustand"
import { persist } from "zustand/middleware"
import { SendEmployee } from "@/types/services/humanResources/employee"

const defaultEmployeeData: SendEmployee = {
  name: "",
  birthday: "",
  sex: "",
  civilState: "",
  rg: "",
  cpf: "",
  email: "",
  motherName: "",
  phone: "",
  city: "",
  postalCode: "",
  street: "",
  neighborhood: "",
  workCard: "",
  pisPasep: "",
  typeEmployment: "",
  laborModality: "",
  laborScale: "",
  admissionDate: "",
  salary: null,
  residentialProve: "",
  reservist: false,
  documentation: "",
  bank: "",
  agency: null,
  account: null,
  pix: "",
  transportationVoucher: false,
  cnpjTransportationVoucher: "",
  monthlyAmount: null,
  additionalDocuments: [],
  department: "",
  operation: "",
  level: "",
  status: "ACTIVE",
  quitDate: ""
}

type EmployeeFormStore = {
  employeeData: SendEmployee
  setEmployeeData: (data: Partial<SendEmployee>) => void
  resetEmployeeData: () => void
}

export const useEmployeeFormStore = create<EmployeeFormStore>()(
  persist(
    (set) => ({
      employeeData: defaultEmployeeData,
      setEmployeeData: (data) =>
        set((state) => ({ employeeData: { ...state.employeeData, ...data } })),
      resetEmployeeData: () => set({ employeeData: defaultEmployeeData })
    }),
    { name: "createEmployeeData" }
  )
)
