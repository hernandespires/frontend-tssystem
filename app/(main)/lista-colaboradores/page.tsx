"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, ChevronDown, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react"

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

import { useEffect, useState, useMemo } from "react"
import { findAllEmployees } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"
import Header from "@/components/Header"

export default function ListaColaboradoresPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const from = searchParams.get("from") || "rh"
	const dashboardPath = from === "ti" ? "/ti" : "/rh"
	const [employees, setEmployees] = useState<Employee[]>([])
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const data = await findAllEmployees()
				setEmployees(data)
			} catch (error) {
				console.error("Failed to fetch employees:", error)
			}
		}
		fetchEmployees()
	}, [])

	const filteredEmployees = useMemo(() => {
		if (!searchTerm) return employees
		const lowerTerm = searchTerm.toLowerCase()
		return employees.filter(
			(emp) =>
				emp.name?.toLowerCase().includes(lowerTerm) ||
				emp.email?.toLowerCase().includes(lowerTerm)
		)
	}, [employees, searchTerm])

	useEffect(() => {
		setCurrentPage(1)
	}, [searchTerm])

	const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
	const currentItems = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage
		return filteredEmployees.slice(start, start + itemsPerPage)
	}, [filteredEmployees, currentPage])

	return (
		<main className="flex flex-col">
			<Header department="Recursos Humanos" />
			<div className="flex justify-center flex-1">
				<section className="flex flex-col justify-center w-303 gap-6 pb-10">
					{/* Breadcrumbs */}
					<div className="px-6">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href={dashboardPath} className="text-sm text-[#A09E9C] hover:text-white">
										Dashboard
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="text-[#A09E9C] mx-2" />
								<BreadcrumbItem>
									<BreadcrumbPage className="text-sm text-default-orange">
										Lista de colaboradores
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>

					{/* Main Container */}
					<div className="mx-6 p-6 bg-transparent border border-[#332C24] rounded-lg">
						{/* Toolbar */}
						<div className="flex justify-start items-center mb-6 gap-4">
							<Button
								variant="outline"
								className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 py-2 px-4 h-10 gap-2 font-normal rounded flex items-center cursor-pointer"
								onClick={() => router.back()}
							>
								<ArrowLeft size={16} />
								Voltar
							</Button>

							<InputGroup className="flex w-[350px] bg-[#14100C] border-[#332C24] h-10 rounded">
								<InputGroupInput 
									placeholder="Buscar colaborador..." 
									className="text-white text-sm bg-transparent border-0!"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<InputGroupAddon className="bg-transparent border-l-0 text-[#A09E9C] p-2! border-0! flex items-center justify-center">
									<Search size={16} />
								</InputGroupAddon>
							</InputGroup>

							<Button
								variant="outline"
								className="bg-transparent border-[#332C24] p-0 h-10 rounded font-normal text-white hover:bg-[#332C24]/50 flex items-center"
							>
								<span className="px-4 py-2 text-sm">Selecionar Filtro</span>
								<div className="w-px h-full bg-[#332C24]"></div>
								<div className="px-3 py-2 text-[#A09E9C]">
									<ChevronDown size={16} />
								</div>
							</Button>
						</div>

						{/* User List */}
						<div className="flex flex-col w-full">
							{currentItems.map((user, index) => (
								<div
									key={user.id}
									className={`
										flex justify-between items-center py-4 cursor-pointer hover:bg-[#1A1510]/50 transition-colors
										${index < currentItems.length - 1 ? "border-b border-[#332C24]" : ""}
									`}
									onClick={() => router.push(`/perfil-colaborador/${user.id}?from=${from}`)}
								>
									<div className="flex items-center gap-4">
										<Avatar className="w-10 h-10 shrink-0 grayscale">
											<AvatarImage src="" />
											<AvatarFallback className="bg-default-orange/20 text-default-orange font-bold text-sm">
												{user.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col gap-0.5">
											<span className="text-default-orange text-[15px] font-medium leading-none">
												{user.name}
											</span>
											<span className="text-[#A09E9C] text-[13px] leading-tight">
												{user.email}
											</span>
										</div>
									</div>
									<ChevronRight size={20} className="text-white shrink-0" />
								</div>
							))}
							{currentItems.length === 0 && (
								<div className="py-10 text-center text-[#A09E9C]">
									Nenhum colaborador encontrado.
								</div>
							)}
						</div>

						{/* Pagination */}
						<div className="flex justify-center gap-2 mt-8">
							{Array.from({ length: totalPages }).map((_, i) => (
								<Button
									key={i + 1}
									variant="outline"
									className={`w-8 h-8 p-0 border-[#332C24] rounded flex items-center justify-center font-normal text-sm transition-colors ${
										currentPage === i + 1 
											? "bg-default-orange/10 text-default-orange border-default-orange" 
											: "bg-transparent text-white hover:bg-[#332C24]/50"
									}`}
									onClick={() => setCurrentPage(i + 1)}
								>
									{i + 1}
								</Button>
							))}

							<Button
								variant="outline"
								className="max-w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm disabled:opacity-50"
								onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
							>
								<ArrowLeft size={16} />
							</Button>
							<Button
								variant="outline"
								className="max-w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm disabled:opacity-50"
								onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
								disabled={currentPage === totalPages || totalPages === 0}
							>
								<ArrowRight size={16} />
							</Button>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
