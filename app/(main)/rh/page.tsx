"use client"

import Button from "@/components/Button"
import DataMetrics from "@/components/DataMetrics"
import DataTable from "@/components/DataTable"
import { BsClipboardData } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import { IoPersonAddOutline } from "react-icons/io5"
import { LuScanFace } from "react-icons/lu"
import { MdOutlinePersonSearch, MdPeopleOutline } from "react-icons/md"
import { PiTreeStructure } from "react-icons/pi"
import { VscSync } from "react-icons/vsc"

const Dashboard = () => (
    <main className="flex flex-col gap-6">
        <div className="flex gap-5 items-end justify-between">
            <DataTable filter="Colaboradores" />
            <div className="flex flex-wrap gap-6 max-w-150">
                <Button isFulled onClick={"/"} icon={<BsClipboardData size={36} />} text="Relatório Mensal" />
                <Button isFulled onClick={"/"} icon={<LuScanFace size={36} />} text="Pontos" />
                <Button isFulled onClick={"/"} icon={<MdOutlinePersonSearch size={36} />} text="Banco de currículos" />
                <Button onClick={"/rh/cadastro-colaborador"} icon={<IoPersonAddOutline size={36} color="white" />} text="Cadastrar Colaboradores" />
                <Button onClick={"/"} icon={<MdPeopleOutline size={36} color="white" />} text="Gerenciar Operações" />
                <Button onClick={"/"} icon={<PiTreeStructure size={36} color="white" />} text="Gerenciar Departamentos" />
            </div>
        </div>
        <div className="flex gap-6">
            <div className="flex flex-col gap-6">
                <Button onClick={"/"} isFulled icon={<VscSync size={36} />} text="Processos Burocráticos" />
                <Button onClick={"/"} isDashed icon={<FaPlus size={36} color="white" />} text="Processos Burocráticos" />
            </div>
            <DataMetrics department="Recursos Humanos" />
        </div>
    </main>
)

export default Dashboard