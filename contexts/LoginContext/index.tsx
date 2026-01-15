"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { Login } from "@/types/services/user"

type LoginContextType = {
    user: Login | null
    setUser: (data: Login | null) => void
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

export const LoginProvider = ({ children, initialUser }: { children: ReactNode, initialUser: Login | null }) => {
    const [user, setUser] = useState<Login | null>(initialUser)

    return <LoginContext.Provider value={{user, setUser}}>{ children }</LoginContext.Provider>
}

export const useLogin = () => {
    const context = useContext(LoginContext)
    if (!context) throw new Error("useLogin deve ser usado dentro de LoginProvider")

    return context
}