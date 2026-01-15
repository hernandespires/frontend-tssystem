import LoginForm from "@/components/LoginForm"
import Image from "next/image"

const Login = () => <main className="min-h-screen flex justify-center items-center"><section className="space-y-16"><Image src="/logo.webp" width="384" height="117" alt="logo" /><LoginForm /></section></main>

export default Login