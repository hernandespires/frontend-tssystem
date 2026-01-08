"use client"

import DataTable from "@/components/DataTable"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import Wellcome from "@/components/Wellcome"
import { useLogin } from "@/contexts/LoginContext"
import { GitBranch } from "lucide-react"

const Home = () => {
    const { user } = useLogin()

    return (
        <main className="bg-[#0b0b0b] h-screen px-4 py-7">
            <Header department="Recursos humanos" />
            <section className="px-40 py-3 flex flex-col gap-2.5">
                <Wellcome name="Luizinho TS" />
                <DataTable filter="Colaboradores" />
            </section>
        </main>
    )
}

export default Home