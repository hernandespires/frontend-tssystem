"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {FaArrowRight} from "react-icons/fa"
import {Button} from "@/components/ui/button"

const RecentCalls = () => {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-4 border border-default-border-color px-5 py-5 rounded-md bg-black/20">
                <h1 className="text-default-orange text-xl font-bold">
                    Últimos Chamados
                </h1>
                {/* Colaborador solicitou... */}
                <div className="flex items-center justify-between border-b border-default-border-color/30 pb-3">
                <Avatar>
                    <AvatarImage src=""/>
                    <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm text-white">
                        <span className="text-default-orange font-semibold">Colaborador</span> solicitou um <span className="text-default-orange font-semibold">chamado CRÍTICO</span>
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span>Às 17:01 | 21/01/2026</span>
                    </span>
                </div>
                <button className="text-default-orange text-xs font-bold hover:underline flex items-center gap-1">
                    Ver <FaArrowRight />
                </button>
                </div>
                {/* Colaborador solicitou... (2) */}
                <div className="flex items-center justify-between border-b border-default-border-color/30 pb-3">
                <Avatar>
                    <AvatarImage src=""/>
                    <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm text-white">
                        <span className="text-default-orange font-semibold">Colaborador</span> solicitou um <span className="text-default-orange font-semibold">chamado MÉDIO</span>
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span>Às 17:01 | 21/01/2026</span>
                    </span>
                </div>
                <button className="text-default-orange text-xs font-bold hover:underline flex items-center gap-1">
                    Ver <FaArrowRight/>
                </button>

                </div>
                <Button 
                    variant="outline"
                    className="w-full border-default-border-color/50 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    Ver todos os chamados
                </Button>
            </div>
        </section>
    )
}

export default RecentCalls