"use client"

import Button from "@/components/Button"
import DataMetricsTI from "@/components/DataMetrics/ti"
import DataTable from "@/components/DataTable"
import RecentCalls from "@/components/RecentCalls"
import { useLogin } from "@/contexts/LoginContext"
import { redirect } from "next/navigation"
import { 
    FaLifeRing, FaLock, FaLaptop, FaVideo, 
    FaUserPlus, FaBox 
} from "react-icons/fa"

const Ti = () => {
    const { user } = useLogin()
    if (!user) redirect("/")

    return (
        <main className="flex flex-col gap-6">
            <div className="flex gap-6 items-start justify-between">
                
                {/* Container da Esquerda (Ocupa o espaço que sobra) */}
                <div className="flex flex-col gap-6 flex-1 min-w-0">                    
                    {/* 1. Cards */}
                    <div className="flex gap-4 w-full">
                        <div className="bg-default-orange rounded-md p-4 flex flex-col items-center justify-center flex-1 text-black shadow-sm">
                            <span className="text-sm font-bold">Novos Chamados</span>
                            <span className="text-4xl font-bold">03</span>
                        </div>
                        <div className="border border-default-border-color bg-black/40 rounded-md p-4 flex flex-col items-center justify-center flex-1">
                            <span className="text-gray-300 text-sm font-bold">Resolvidos</span>
                            <span className="text-4xl font-bold text-white">10</span>
                        </div>
                        <div className="border border-default-border-color bg-black/40 rounded-md p-4 flex flex-col items-center justify-center flex-1">
                            <span className="text-gray-300 text-sm font-bold">Não Resolvidos</span>
                            <span className="text-4xl font-bold text-white">03</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <RecentCalls />
                    </div>
                </div>
                <div className="flex flex-wrap gap-6 max-w-150 w-full justify-end">
                    <Button isFulled onClick={"/"} icon={<FaLifeRing size={36} color="black" />} text="Controle de Chamados" />
                    <Button isFulled onClick={"/"} icon={<FaLock size={36} color="black" />} text="Controle de Acessos" />
                    <Button isFulled onClick={"/"} icon={<FaLaptop size={36} color="black" />} text="Controle de Patrimônios" />
                    <Button isFulled onClick={"/"} icon={<FaVideo size={36} color="black" />} text="Controle de Câmeras" />
                    <Button onClick={"/"} icon={<FaUserPlus size={36} color="white" />} text="Cadastro de Usuários" />
                    <Button onClick={"/"} icon={<FaBox size={36} color="white" />} text="Cadastro de Patrimônios" />
                </div>
            </div>

            <div className="flex gap-6 items-start">
                <div className="flex-1">
                    <DataTable filter="Colaboradores" />
                </div>

                <div className="w-full max-w-150">
                    <DataMetricsTI department="TI" />
                </div>
            </div>
        </main>
    )
}

export default Ti