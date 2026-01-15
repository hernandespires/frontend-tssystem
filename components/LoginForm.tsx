"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { login } from "@/services/user"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLogin } from "@/contexts/LoginContext"
import { FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react"

const LoginForm = () => {
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const { setUser } = useLogin()

    const isLogged = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        
        try {
            await login({email, senha})
            setUser({email, senha})

            router.push("/rh")
        } catch (err) {
            setError("Erro ao logar")
        }
    }

    return (
        <form className="border-2 px-4 py-8.5 space-y-5 rounded-md border-default-border-color" onSubmit={isLogged}>
            {error && <Alert variant="destructive"><AlertCircleIcon /><AlertTitle>Erro ao logar!</AlertTitle><AlertDescription><p>{error}</p></AlertDescription></Alert>}
            <div className="grid w-full max-w-sm items-center space-y-3 text-default-orange text-bold focus:border-default-orange focus:ring-1 focus:ring-default-orange">
                <Label htmlFor="email">
                    Email
                </Label>
                <Input type="email" id="email" placeholder="Email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
            </div>
            <div className="grid w-full max-w-sm items-center space-y-3 text-default-orange text-bold focus:border-default-orange focus:ring-1 focus:ring-default-orange">
                <Label htmlFor="password">
                    Senha
                </Label>
                <Input type="password" id="senha" placeholder="Senha" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSenha(event.target.value)} />
            </div>
            <Button type="submit" className="w-full bg-default-orange text-white">
                Entrar
            </Button>
            <Button type="submit" className="w-full" onClick={() => signIn("google", { callbackUrl: "/rh" })}>
                <FaGoogle />
                Entrar com o Google
            </Button>
        </form>
    )
}

export default LoginForm