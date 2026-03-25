"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, ArrowLeft, ArrowRight, Plus, Bell } from "lucide-react"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/Header"

interface AssetMock {
	id: string
	patrimonio: string
	colaborador: string
	desde: string
	departamento: string
	status: string
}

const MOCK_DATA: AssetMock[] = Array.from({ length: 14 }, (_, i) => ({
	id: `asset-${i}`,
	patrimonio: "TS0025",
	colaborador: "colaborador@trajetoriadosucesso.com",
	desde: "11/12/2025",
	departamento: ["01", "02", "03"][i % 3],
	status: "Ativo",
}))

export default function ControlePatrimoniosPage() {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 14 // As requested in JSON "count": 14 for the table

	const totalPages = 5 // Hardcoded as per design image shown 1 2 3 4 5

	return (
		<>
			{/* Breadcrumbs */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/ti" className="text-sm text-[#8E8B87] hover:text-white">
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-[#8E8B87] mx-2" />
					<BreadcrumbItem>
						<BreadcrumbPage className="text-sm text-[#FFB300]">
							Controle de Patrimônios
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Main Container */}
			<div className="p-8 bg-transparent border border-[#332C24] rounded-lg">
				{/* Toolbar */}
				<div className="flex justify-between items-center mb-8">
					<div className="flex gap-4">
						<Button
							variant="outline"
							className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 py-2 px-4 h-10 gap-2 font-normal rounded flex items-center"
							onClick={() => router.back()}
						>
							<ArrowLeft size={16} />
							Voltar
						</Button>

						<InputGroup className="flex w-[300px] bg-[#14100C] border-[#332C24] h-10 rounded">
							<InputGroupInput 
								placeholder="Buscar patrimônio..." 
								className="text-white text-sm bg-transparent border-0!"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<InputGroupAddon className="bg-transparent border-l-0 text-[#8E8B87] p-2! border-0! flex items-center justify-center">
								<Search size={16} />
							</InputGroupAddon>
						</InputGroup>

						<Button
							variant="outline"
							className="bg-transparent border-[#332C24] p-0 h-10 rounded font-normal text-white hover:bg-[#332C24]/50 flex items-center cursor-pointer"
						>
							<span className="px-4 py-2 text-sm">Selecionar Filtro</span>
							<div className="w-px h-full bg-[#332C24]"></div>
							<div className="px-3 py-2 text-[#8E8B87]">
								<ChevronDown size={16} />
							</div>
						</Button>
					</div>

					<Button
						className="bg-white text-black hover:bg-white/90 px-5 py-2.5 h-auto font-medium rounded text-sm gap-2 cursor-pointer"
						onClick={() => router.push("/ti/cadastro-patrimonio")}
					>
						<Plus size={18} />
						Cadastrar patrimônio
					</Button>
				</div>

				{/* Data Table */}
				<div className="w-full">
					{/* Table Header */}
					<div className="grid grid-cols-[1.2fr_3fr_1fr_1.2fr_1.2fr_1.2fr] pb-4 border-b border-[#332C24] mb-4">
						<span className="text-[#FFFFFF] font-semibold text-sm">Patrimônio</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Colaborador</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Desde:</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Departamento</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Ativo/Desativado</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Ação</span>
					</div>

					{/* Table Rows */}
					<div className="flex flex-col">
						{MOCK_DATA.map((row) => (
							<div
								key={row.id}
								className="grid grid-cols-[1.2fr_3fr_1fr_1.2fr_1.2fr_1.2fr] items-center py-4 border-b border-[#332C24] last:border-0"
							>
								<span className="text-[#FFB300] font-medium text-sm">{row.patrimonio}</span>
								<span className="text-[#8E8B87] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
									{row.colaborador}
								</span>
								<span className="text-[#FFFFFF] text-sm">{row.desde}</span>
								<span className="text-[#FFB300] text-sm">{row.departamento}</span>
								<span className="text-[#FFB300] text-sm">{row.status}</span>
								<button 
									className="text-[#FFB300] text-sm flex items-center gap-1 hover:underline text-left"
									onClick={() => {}}
								>
									Editar patrimônio <ArrowRight size={14} className="ml-1" />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Pagination */}
			<div className="flex justify-center gap-2 mt-8">
				<Button
					variant="outline"
					className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm cursor-pointer disabled:cursor-not-allowed"
					onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
					disabled={currentPage === 1}
				>
					<ArrowLeft size={14} />
				</Button>

				{[1, 2, 3, 4, 5].map((page) => (
					<Button
						key={page}
						variant="outline"
						className={`w-8 h-8 p-0 border-[#332C24] rounded flex items-center justify-center font-normal text-sm transition-colors ${
							currentPage === page 
								? "text-[#FFB300] border-[#332C24] bg-transparent" 
								: "bg-transparent text-white hover:bg-[#332C24]/50"
						}`}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</Button>
				))}

				<Button
					variant="outline"
					className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm cursor-pointer disabled:cursor-not-allowed"
					onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
					disabled={currentPage === 5}
				>
					<ArrowRight size={14} />
				</Button>
			</div>
		</>
	)
}
