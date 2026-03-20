"use client"

import Button from "@/components/Button"
import DataMetrics from "@/components/DataMetrics"
import DataTable from "@/components/DataTable"
import { useLogin } from "@/contexts/LoginContext"
import { useFindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { Employee } from "@/types/services/humanResources/employee"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { BsClipboardData } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import { IoPersonAddOutline } from "react-icons/io5"
import { LuScanFace } from "react-icons/lu"
import { MdOutlinePersonSearch, MdPeopleOutline } from "react-icons/md"
import { PiTreeStructure } from "react-icons/pi"
import { VscSync } from "react-icons/vsc"

const Rh = () => {
	const { user } = useLogin()
	if (!user) redirect("/login")

	const router = useRouter()
	const { setEmployeeFound } = useFindEmployeeContext()
	const [allEmployees] = useState<Employee[] | null>(null)

	return (
		<main className="flex flex-col gap-6">
			<div className="flex gap-5 items-end justify-between">
				<DataTable
					filter="Colaboradores"
					data={allEmployees ?? []}
					setContextInfo={setEmployeeFound}
					path="/rh/cadastro-colaborador"
				/>
				<div className="flex flex-wrap gap-6 max-w-150">
					<Button
						isFulled
						onClick={() => router.push("/")}
						icon={<BsClipboardData size={36} color="black" />}
					>
						Relatório Mensal
					</Button>
					<Button
						isFulled
						onClick={() => router.push("/")}
						icon={<LuScanFace size={36} color="black" />}
					>
						Pontos
					</Button>
					<Button
						isFulled
						onClick={() => router.push("/")}
						icon={<MdOutlinePersonSearch size={36} color="black" />}
					>
						Banco de currículos
					</Button>
					<Button
						onClick={() => router.push("/rh/cadastro-colaborador")}
						icon={<IoPersonAddOutline size={36} color="white" />}
					>
						Cadastrar Colaboradores
					</Button>
					<Button
						onClick={() => router.push("/")}
						icon={<MdPeopleOutline size={36} color="white" />}
					>
						Gerenciar Operações
					</Button>
					<Button
						onClick={() => router.push("/")}
						icon={<PiTreeStructure size={36} color="white" />}
					>
						Gerenciar Departamentos
					</Button>
				</div>
			</div>
			<div className="flex gap-6">
				<div className="flex flex-col gap-6">
					<Button
						onClick={() => router.push("/rh/processos-burocraticos")}
						isFulled
						icon={<VscSync size={36} color="black" />}
					>
						Processos Burocráticos
					</Button>
					<Button
						onClick={() => router.push("/rh/processos-burocraticos")}
						isDashed
						icon={<FaPlus size={36} color="white" />}
					>
						Novo Processo
					</Button>
				</div>
				<DataMetrics department="Recursos Humanos" datas={[]} />
			</div>
		</main>
	)
}

export default Rh
