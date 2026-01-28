"use client"

import { Button } from "@/components/ui/button"
import { FaFolderOpen, FaArrowRight, FaUserCircle } from "react-icons/fa"

// 1. Dados Fictícios (Mock Data) para preencher a lista
const transactions = [
    { id: 1, user: "Colaborador", action: "pagamento", time: "14:44", date: "28/02/2026" },
    { id: 2, user: "Colaborador", action: "pagamento", time: "14:44", date: "28/02/2026" },
    { id: 3, user: "Colaborador", action: "pagamento", time: "14:44", date: "28/02/2026" },
]

const RecentTransactions = () => {
    return (
        <section className="border border-default-border-color w-full rounded-md px-5 py-6 bg-black/20 flex flex-col justify-between h-full">
            
            <div>
                <h1 className="text-xl font-bold text-default-orange mb-6">
                    Últimas transações
                </h1>
                <div className="flex flex-col gap-6">
                    {transactions.map((item) => (
                        <div key={item.id} className="flex items-center justify-between group cursor-pointer">
                            
                            {/* Esquerda: Foto + Texto */}
                            <div className="flex items-center gap-3">
                                {/* Avatar (Usei um ícone, mas pode ser <Image />) */}
                                <div className="w-10 h-10 rounded-full from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                                    <FaUserCircle size={24} />
                                </div>

                                {/* Textos */}
                                <div className="flex flex-col">
                                    <span className="text-sm text-white font-medium">
                                        {item.user} realizou um <span className="text-default-orange">{item.action}</span>
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Às {item.time} | {item.date}
                                    </span>
                                </div>
                            </div>

                            {/* Direita: Botão "Ver" */}
                            <div className="flex items-center gap-1 text-default-orange font-bold text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                                <span>Ver</span>
                                <FaArrowRight size={12} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
        <Button
            variant="outline"
            className="w-full border-default-border-color/50 text-gray-300 hover:bg-white/5 hover:text-white">
                Ver todas as transações
        </Button>
            </div>
        </section>
    )
}

export default RecentTransactions