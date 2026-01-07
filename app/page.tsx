"use client"

import { useLogin } from "@/contexts/LoginContext"

const Home = () => {
    const { user } = useLogin()

    return <main>{user ? user.email : "Usuário não logado"}</main>
}

export default Home