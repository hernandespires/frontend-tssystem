import { LoginProvider } from "@/contexts/LoginContext"
import Header from "@/components/Header"

const LoginLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <main className="min-h-screen bg-[url('/FLUID-BG.png')] bg-cover bg-center bg-no-repeat"><LoginProvider>{ children }</LoginProvider></main>
)

export default LoginLayout