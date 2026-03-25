"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { 
	ArrowLeft, 
	Bell, 
	ChevronDown, 
	Pencil, 
	FileText, 
	ClipboardList, 
	BarChart3, 
	List,
	MapPin,
	Phone,
	Mail,
	Calendar
} from "lucide-react"

import Header from "@/components/Header"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { findEmployeeById } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"

export default function PerfilColaboradorPage() {
	const params = useParams()
	const router = useRouter()
	const searchParams = useSearchParams()
	const from = searchParams.get("from") || "rh"
	const dashboardPath = from === "ti" ? "/ti" : "/rh"
	const [employee, setEmployee] = useState<Employee | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchEmployee = async () => {
			if (!params.id) return
			try {
				const data = await findEmployeeById(params.id as string)
				setEmployee(data)
			} catch (error) {
				console.error("Failed to fetch employee:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchEmployee()
	}, [params.id])

	if (loading) {
		return (
			<main className="flex flex-col min-h-screen bg-[#14100C] text-white items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB300]"></div>
			</main>
		)
	}

	if (!employee) {
		return (
			<main className="flex flex-col min-h-screen bg-[#14100C] text-white items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">Colaborador não encontrado</h1>
				<Button onClick={() => router.back()}>Voltar</Button>
			</main>
		)
	}

	return (
		<main className="flex flex-col min-h-screen bg-[#14100C] text-white pb-10 font-inter">
			<Header department="Recursos Humanos" />

			{/* Breadcrumbs */}
			<div className="px-6 mb-6 mt-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href={dashboardPath} className="text-sm text-[#A09E9C] hover:text-white">
								Dashboard
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-[#A09E9C] mx-2" />
						<BreadcrumbItem>
							<BreadcrumbLink href={`/lista-colaboradores?from=${from}`} className="text-sm text-[#A09E9C] hover:text-white">
								Lista de Colaboradores
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-[#A09E9C] mx-2" />
						<BreadcrumbItem>
							<BreadcrumbPage className="text-sm text-[#FFB300]">
								Perfil
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="mx-6 p-6 border border-[#2A241D] rounded-lg bg-transparent">
				{/* Top Bar */}
				<div className="flex items-center gap-6 mb-6">
					<Button
						variant="outline"
						className="bg-transparent border-[#2A241D] text-white hover:bg-[#2A241D]/50 py-2 px-4 h-10 gap-2 font-normal rounded flex items-center"
						onClick={() => router.back()}
					>
						<ArrowLeft size={16} />
						Voltar
					</Button>
					<h2 className="text-[#FFB300] font-bold text-base">Perfil</h2>
				</div>

				{/* Profile Header Card */}
				<div className="flex justify-between items-center p-6 border border-[#2A241D] rounded-lg mb-6 bg-transparent">
					<div className="flex items-center gap-8">
						<Avatar className="w-[100px] h-[100px] rounded-full">
							<AvatarImage src="" />
							<AvatarFallback className="bg-[#FFB300]/20 text-[#FFB300] font-bold text-2xl uppercase">
								{employee.name.charAt(0)}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col gap-1">
							<h1 className="text-[#FFB300] text-xl font-bold">{employee.name}</h1>
							<span className="text-white text-sm">Operação {employee.operation || "N/A"}</span>
							<span className="text-white text-sm uppercase">{employee.level || "N/A"}</span>
							<span className="text-white text-sm uppercase">{employee.department || "N/A"}</span>
						</div>

						<div className="w-px h-20 bg-[#2A241D]"></div>

						<div className="flex flex-col gap-1">
							<h3 className="text-white text-lg font-bold mb-1">Informações</h3>
							<span className="text-[#A09E9C] text-sm flex items-center gap-2">
								<Phone size={14} /> {employee.phone || "N/A"}
							</span>
							<span className="text-[#A09E9C] text-sm flex items-center gap-2">
								<Phone size={14} /> {employee.phone || "N/A"} (Emergencial)
							</span>
							<span className="text-[#A09E9C] text-sm flex items-center gap-2">
								<Mail size={14} /> {employee.email}
							</span>
						</div>

						<div className="w-px h-20 bg-[#2A241D]"></div>

						<div className="flex flex-col gap-1">
							<h3 className="text-white text-lg font-bold mb-1">Detalhes</h3>
							<span className="text-[#A09E9C] text-sm flex items-center gap-2">
								<Calendar size={14} /> Entrada: {employee.admissionDate || "N/A"}
							</span>
							<span className="text-[#A09E9C] text-sm flex items-center gap-2">
								<MapPin size={14} /> {employee.street || "N/A"}, {employee.neighborhood || "N/A"}
							</span>
							<span className="text-[#A09E9C] text-sm">
								{employee.city || "N/A"}-{employee.postalCode ? employee.postalCode.slice(0, 2) : "SP"}, {employee.postalCode || "N/A"}
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-3 items-end">
						<Button 
							className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded font-medium flex items-center gap-2"
							onClick={() => router.push(`/rh/cadastro-colaborador?id=${employee.id}`)}
						>
							<Pencil size={16} />
							Editar Colaborador
						</Button>
						<div className="bg-[#FFB300] text-black text-xs font-bold px-4 py-1.5 rounded uppercase">
							Conta Ativa
						</div>
					</div>
				</div>

				{/* Bottom Grid */}
				<div className="grid grid-cols-2 gap-6">
					{/* Left Column: Points */}
					<div className="p-6 border border-[#2A241D] rounded-lg flex flex-col gap-4">
						<h3 className="text-[#FFB300] text-lg font-bold">Últimos pontos</h3>
						<div className="flex flex-col gap-3">
							{[
								{ label: "Entrada", time: "22/02/25 - 08:00" },
								{ label: "Saída", time: "22/02/25 - 12:30" },
								{ label: "Entrada", time: "22/02/25 - 14:00" },
								{ label: "Saída", time: "22/02/25 - 18:18" },
							].map((point, i) => (
								<div key={i} className="flex justify-between items-center p-3 border border-[#2A241D] rounded">
									<div className="flex flex-col gap-0.5">
										<span className="text-white text-sm font-medium">{point.label}</span>
										<span className="text-[#A09E9C] text-xs font-medium">{point.time}</span>
									</div>
									<Button variant="outline" className="bg-[#FFB300] text-black border-none hover:bg-[#FFB300]/80 h-8 px-4 text-xs font-medium">
										Ajustar
									</Button>
								</div>
							))}
						</div>
						<div className="flex justify-center mt-3">
							<Button variant="outline" className="bg-transparent border-[#2A241D] text-[#A09E9C] hover:bg-[#2A241D]/50 gap-2 h-9 px-4 text-xs">
								<List size={14} />
								Ver todos os pontos
							</Button>
						</div>
					</div>

					{/* Right Column: Metrics and Actions */}
					<div className="flex flex-col gap-6">
						{/* Metrics Card */}
						<div className="flex-1 p-6 border border-[#2A241D] rounded-lg flex flex-col justify-between min-h-[250px]">
							<h3 className="text-[#FFB300] text-lg font-bold">Métricas</h3>
							<div className="flex items-center justify-center text-[#A09E9C] text-sm">
								Área pronta para receber gráficos.
							</div>
							<div className="flex justify-center mt-4">
								<Button variant="outline" className="bg-[#0C0907] border-[#2A241D] text-white hover:bg-[#2A241D]/50 gap-2 h-9 px-4 text-xs">
									<BarChart3 size={14} />
									Ver todas as métricas
								</Button>
							</div>
						</div>

						{/* Action Buttons Grid */}
						<div className="grid grid-cols-2 gap-6">
							<div className="h-[140px] bg-[#FFB300] rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#FFB300]/90 transition-colors">
								<FileText size={32} color="#000" />
								<span className="text-black font-bold text-center">Documentação</span>
							</div>
							<div className="h-[140px] bg-[#FFB300] rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#FFB300]/90 transition-colors">
								<ClipboardList size={32} color="#000" />
								<span className="text-black font-bold text-center leading-tight">
									Histórico de<br />Mudanças
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
