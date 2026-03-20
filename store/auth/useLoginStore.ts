import { create } from "zustand"
import { Login } from "@/types/services/user"

type LoginStore = {
  user: Login | null
  setUser: (user: Login | null) => void
}

export const useLoginStore = create<LoginStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))
