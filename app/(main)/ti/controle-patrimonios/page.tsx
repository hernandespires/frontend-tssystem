"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, ArrowLeft, ArrowRight, Plus, Loader2, Trash2 } from "lucide-react"

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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { findAllAssets, deleteAsset } from "@/services/ti/asset"
import { Asset } from "@/types/services/ti/asset"
import { Employee } from "@/types/services/humanResources/employee"
import { toast } from "sonner"

const ITEMS_PER_PAGE = 14

function getEmployeeName(employee: Employee | string | undefined): string {
	if (!employee) return "—"
	if (typeof employee === "string") return employee
	return employee.name || "—"
}

function formatAssetCode(serialNumber: string | undefined): string {
	return serialNumber ? `TS${serialNumber}` : "—"
}

export default function ControlePatrimoniosPage() {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const [assets, setAssets] = useState<Asset[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [deletingId, setDeletingId] = useState<string | null>(null)
	const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null)

	const handleConfirmDelete = async () => {
		if (!assetToDelete?.id_patrimonio) return

		const id = assetToDelete.id_patrimonio
		setAssetToDelete(null)
		setDeletingId(id)
		try {
			await deleteAsset(id)
			setAssets((prev) => prev.filter((a) => a.id_patrimonio !== id))
			toast.success("Patrimônio excluído com sucesso!")
		} catch {
			toast.error("Erro ao excluir patrimônio.")
		} finally {
			setDeletingId(null)
		}
	}

	useEffect(() => {
		const loadAssets = async () => {
			try {
				const data = await findAllAssets()
				setAssets(data)
			} catch {
				toast.error("Erro ao carregar patrimônios.")
			} finally {
				setIsLoading(false)
			}
		}
		loadAssets()
	}, [])

	const filteredAssets = useMemo(() => {
		if (!searchTerm.trim()) return assets
		const term = searchTerm.toLowerCase()
		return assets.filter((asset) => {
			const code = formatAssetCode(asset.numero_serie).toLowerCase()
			const employee = getEmployeeName(asset.id_colaborador).toLowerCase()
			const department = (asset.departamento || "").toLowerCase()
			return code.includes(term) || employee.includes(term) || department.includes(term)
		})
	}, [assets, searchTerm])

	const totalPages = Math.max(1, Math.ceil(filteredAssets.length / ITEMS_PER_PAGE))
	const paginatedAssets = filteredAssets.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	)

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
								onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
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
					<div className="grid grid-cols-[1.2fr_3fr_1fr_1.2fr_1.2fr_1.2fr_auto] pb-4 border-b border-[#332C24] mb-4">
						<span className="text-[#FFFFFF] font-semibold text-sm">Patrimônio</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Colaborador</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Desde:</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Departamento</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Ativo/Desativado</span>
						<span className="text-[#FFFFFF] font-semibold text-sm">Ação</span>
						<span></span>
					</div>

					{/* Table Rows */}
					<div className="flex flex-col">
						{isLoading ? (
							<div className="flex items-center justify-center py-16">
								<Loader2 size={24} className="animate-spin text-[#FFB300]" />
								<span className="ml-3 text-[#8E8B87] text-sm">Carregando patrimônios...</span>
							</div>
						) : paginatedAssets.length === 0 ? (
							<div className="flex items-center justify-center py-16">
								<span className="text-[#8E8B87] text-sm">
									{searchTerm ? "Nenhum patrimônio encontrado para esta busca." : "Nenhum patrimônio cadastrado."}
								</span>
							</div>
						) : (
							paginatedAssets.map((asset) => (
								<div
									key={asset.id_patrimonio || asset.numero_serie}
									className="grid grid-cols-[1.2fr_3fr_1fr_1.2fr_1.2fr_1.2fr_auto] items-center py-4 border-b border-[#332C24] last:border-0"
								>
									<span className="text-[#FFB300] font-medium text-sm">
										{formatAssetCode(asset.numero_serie)}
									</span>
									<span className="text-[#8E8B87] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
										{getEmployeeName(asset.id_colaborador)}
									</span>
									<span className="text-[#FFFFFF] text-sm">{asset.data_compra || "—"}</span>
									<span className="text-[#FFB300] text-sm">{asset.departamento}</span>
									<span className="text-[#FFB300] text-sm">{asset.status}</span>
									<button
										className="text-[#FFB300] text-sm flex items-center gap-1 hover:underline text-left cursor-pointer"
										onClick={() => router.push(`/ti/cadastro-patrimonio?id=${asset.id_patrimonio}`)}
									>
										Editar patrimônio <ArrowRight size={14} className="ml-1" />
									</button>
									<button
										className="flex items-center justify-center text-red-500 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
										onClick={() => setAssetToDelete(asset)}
										disabled={deletingId === asset.id_patrimonio}
										title="Excluir patrimônio"
									>
										{deletingId === asset.id_patrimonio ? (
											<Loader2 size={16} className="animate-spin" />
										) : (
											<Trash2 size={16} />
										)}
									</button>
								</div>
							))
						)}
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

				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
					onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
					disabled={currentPage === totalPages}
				>
					<ArrowRight size={14} />
				</Button>
			</div>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={!!assetToDelete} onOpenChange={(open) => !open && setAssetToDelete(null)}>
				<AlertDialogContent className="bg-[#1A1510] border-[#332C24]">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-white">Excluir patrimônio</AlertDialogTitle>
						<AlertDialogDescription className="text-[#8E8B87]">
							Tem certeza que deseja excluir o patrimônio{" "}
							<span className="text-[#FFB300] font-medium">
								{assetToDelete ? formatAssetCode(assetToDelete.numero_serie) : ""}
							</span>
							? Esta ação não pode ser desfeita.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 hover:text-white cursor-pointer">
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
							onClick={handleConfirmDelete}
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
