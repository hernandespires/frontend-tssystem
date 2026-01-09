"use client"

import Button from "@/components/Button"
import DataMetrics from "@/components/DataMetrics"
import DataTable from "@/components/DataTable"
import Header from "@/components/Header"
import { useLogin } from "@/contexts/LoginContext"
import { BsClipboardData } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import { IoPersonAddOutline } from "react-icons/io5"
import { LuScanFace } from "react-icons/lu"
import { MdOutlinePersonSearch, MdPeopleOutline } from "react-icons/md"
import { PiTreeStructure } from "react-icons/pi"
import { VscSync } from "react-icons/vsc"

const Home = () => {
    const { user } = useLogin()

    return (
        <main className="px-4 py-7 flex flex-col min-h-screen">
            <Header department="Recursos humanos" />
            <div className="flex justify-center flex-1">
                <section className=" flex flex-col justify-center min-w-303 gap-6">
                        <div className="flex gap-5 items-end justify-between">
                            <DataTable filter="Colaboradores" />
                            <div className="flex flex-wrap gap-6 max-w-150">
                                <Button isFulled icon={<BsClipboardData size={36} />} text="Relatório Mensal" />
                                <Button isFulled icon={<LuScanFace size={36} />} text="Pontos" />
                                <Button isFulled icon={<MdOutlinePersonSearch size={36} />} text="Banco de currículos" />
                                <Button icon={<IoPersonAddOutline size={36} color="white" />} text="Cadastrar Colaboradores" />
                                <Button icon={<MdPeopleOutline size={36} color="white" />} text="Gerenciar Operações" />
                                <Button icon={<PiTreeStructure size={36} color="white" />} text="Gerenciar Departamentos" />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-6">
                                <Button isFulled icon={<VscSync size={36} />} text="Processos Burocráticos" />
                                <Button isDashed icon={<FaPlus size={36} color="white" />} text="Processos Burocráticos" />
                            </div>
                            <DataMetrics department="Recursos Humanos" />
                        </div>
                </section>
            </div>
        </main>
    )
}

export default Home