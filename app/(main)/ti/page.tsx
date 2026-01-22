"use client"

import Button from "@/components/Button"
import DataMetricsTI from "@/components/DataMetrics/ti"
import DataTable from "@/components/DataTable"
import RecentCalls from "@/components/RecentCalls" // 
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
        <main className="flex gap-6 w-full items-start">
            
            <div className="flex flex-col flex-1 gap-6 w-full">
                <div className="flex gap-4 w-full">
                    {/* Card Laranja */}
                    <div className="bg-default-orange rounded-md p-4 flex flex-col items-center justify-center flex-1 text-black shadow-sm">
                        <span className="text-sm font-bold">Novos Chamados</span>
                        <span className="text-4xl font-bold">03</span>
                    </div>
                    
                    {/* Cards Escuros */}
                    <div className="border border-default-border-color bg-black/40 rounded-md p-4 flex flex-col items-center justify-center flex-1">
                        <span className="text-gray-300 text-sm font-bold">Resolvidos</span>
                        <span className="text-4xl font-bold text-white">10</span>
                    </div>

                    <div className="border border-default-border-color bg-black/40 rounded-md p-4 flex flex-col items-center justify-center flex-1">
                        <span className="text-gray-300 text-sm font-bold">Não Resolvidos</span>
                        <span className="text-4xl font-bold text-white">03</span>
                    </div>
                </div>
                <RecentCalls />
                <DataTable filter="Usuários" />
            </div>


            <div className="flex flex-col gap-6 w-[400px] min-w-[400px]">
                    <div className="grid grid-cols-2 gap-6">
                    <Button isFulled onClick={"/"} icon={<FaLifeRing size={36} color="black" />} text="Controle de Chamados" />
                    <Button isFulled onClick={"/"} icon={<FaLock size={36} color="black" />} text="Controle de Acessos" />
                    <Button isFulled onClick={"/"} icon={<FaLaptop size={36} color="black" />} text="Controle de Patrimônios" />
                    <Button isFulled onClick={"/"} icon={<FaVideo size={36} color="black" />} text="Controle de Câmeras" />
                    <Button onClick={"/"} icon={<FaUserPlus size={36} color="white" />} text="Cadastro de Usuários" />
                    <Button onClick={"/"} icon={<FaBox size={36} color="white" />} text="Cadastro de Patrimônios" />
                </div>

                <div className="w-full h-full">
                    <DataMetricsTI department="TI" />
                </div>
            </div>
        </main>
    )
}

export default Ti