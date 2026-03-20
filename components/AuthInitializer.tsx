"use client"

import { useEffect } from "react"
import { useLoginStore } from "@/store/auth/useLoginStore"
import { Login } from "@/types/services/user"

const AuthInitializer = ({ initialUser }: { initialUser: Login | null }) => {
  const setUser = useLoginStore((s) => s.setUser)

  useEffect(() => {
    setUser(initialUser)
  }, [initialUser, setUser])

  return null
}

export default AuthInitializer
