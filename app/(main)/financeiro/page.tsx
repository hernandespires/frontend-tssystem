"use client"

import Button from "@/components/Button"
import DataMetricsFinance from "@/components/DataMetrics/finance"
import RecentTransactions from "@/components/RecentTransactions" 
import { useLogin } from "@/contexts/LoginContext"
import { redirect } from "next/navigation"
import { 
    FaWallet, FaMoneyBillWave, FaCreditCard, 
    FaChartLine, FaBell, FaCalendarAlt, FaExchangeAlt 
} from "react-icons/fa"

const Financeiro = () => {
    const { user } = useLogin()
    if (!user) redirect("/")

    return (
        <main className="flex flex-col gap-6 pb-10">
            
            {/* === BLOCO SUPERIOR (Dividido em 2 Colunas Iguais) === */}
            {/* items-stretch: Faz as duas colunas terem a mesma altura automaticamente */}
            <div className="flex gap-6 items-stretch">
                
                {/* --- COLUNA ESQUERDA (Cards + Gráfico) --- */}
                <div className="flex flex-col gap-6 flex-1 min-w-0">
                    
                    {/* Cards de Valor */}
                    <div className="flex gap-4 w-full">
                        <div className="bg-default-orange rounded-md p-4 flex flex-col items-center justify-center flex-1 text-black shadow-sm h-32">
                            <span className="text-sm font-bold">Saldo em conta</span>
                            <span className="text-3xl font-bold">R$14.200</span>
                            <span className="text-xs text-black/70 font-semibold mt-1">+2% (Neste mês)</span>
                        </div>
                        <div className="border border-default-border-color bg-black/40 rounded-md p-4 flex flex-col items-center justify-center flex-1 h-32">
                            <span className="text-gray-300 text-sm font-bold">A receber</span>
                            <span className="text-3xl font-bold text-green-500">R$45.000</span>
                            <span className="text-xs text-gray-500 font-semibold mt-1">+3% (Neste mês)</span>
                        </div>
                        <div className="border border-default-border-color bg-black/40 rounded-md p-4 flex flex-col items-center justify-center flex-1 h-32">
                            <span className="text-gray-300 text-sm font-bold">A pagar</span>
                            <span className="text-3xl font-bold text-red-500">R$3.200</span>
                            <span className="text-xs text-gray-500 font-semibold mt-1">-1.3% (Neste mês)</span>
                        </div>
                    </div>

                    {/* Gráfico */}
                    {/* flex-1: Ocupa todo o resto da altura da esquerda */}
                    <div className="w-full flex-1">
                        <DataMetricsFinance />
                    </div>
                </div>

                {/* --- COLUNA DIREITA (Botões + Transações) --- */}
                {/* flex flex-col: Organiza verticalmente */}
                <div className="flex flex-col gap-6 flex-1 min-w-0">
                    
                    {/* Botões do Topo */}
                    <div className="flex gap-4 w-full h-40"> {/* h-40 fixa a altura dos botões quadrados */}
                        <div className="flex-1">
                            {/* className="w-full h-full" SOBRESCREVE o w-46 do componente Button original */}
                            <Button isFulled className="w-full h-full" onClick={"/"} icon={<FaWallet size={32} color="black" />} text="Contas a receber" />
                        </div>
                        <div className="flex-1">
                            <Button isFulled className="w-full h-full" onClick={"/"} icon={<FaMoneyBillWave size={32} color="black" />} text="Contas a pagar" />
                        </div>
                        <div className="flex-1">
                            <Button isFulled className="w-full h-full" onClick={"/"} icon={<FaCreditCard size={32} color="black" />} text="Cartões" />
                        </div>
                    </div>

                    {/* Últimas Transações */}
                    {/* flex-1: AQUI ESTÁ A MÁGICA. Faz essa div crescer até o fundo. */}
                    <div className="w-full flex-1">
                        <RecentTransactions /> 
                    </div>
                </div>
            </div>

            {/* === RODAPÉ (4 Botões Largos) === */}
            <div className="grid grid-cols-4 gap-6">
                <Button 
                    isHorizontal 
                    className="bg-transparent border border-white/20 text-white hover:bg-white/5 flex-row justify-start gap-4 px-6 h-32"
                    onClick={"/"} 
                    icon={<FaChartLine size={32} className="text-default-orange" />} 
                    text="Relatório mensal" 
                />
                <Button 
                    isHorizontal
                    className="bg-transparent border border-white/20 text-white hover:bg-white/5 flex-row justify-start gap-4 px-6 h-32"
                    onClick={"/"} 
                    icon={<FaBell size={32} className="text-default-orange" />} 
                    text="Alertas financeiros" 
                />
                <Button 
                    isHorizontal
                    className="bg-transparent border border-white/20 text-white hover:bg-white/5 flex-row justify-start gap-4 px-6 h-32"
                    onClick={"/"} 
                    icon={<FaCalendarAlt size={32} className="text-default-orange" />} 
                    text="Projeções anuais" 
                />
                <Button 
                    isHorizontal
                    className="bg-transparent border border-white/20 text-white hover:bg-white/5 flex-row justify-start gap-4 px-6 h-32"
                    onClick={"/"} 
                    icon={<FaExchangeAlt size={32} className="text-default-orange" />} 
                    text="Centro de custos" 
                />
            </div>

        </main>
    )
}

export default Financeiro