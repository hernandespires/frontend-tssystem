"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
	ArrowLeft,
	ArrowRightFromLine,
	ChevronDown,
	Search,
	ArrowDown,
	Rocket,
	Calendar as CalendarIcon,
} from "lucide-react"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { findCustomFieldEnumOptions, findSuppliersByCategories, findProjectTasks } from "@/services/asana/project"
import { AsanaEnumOption } from "@/types/services/asana/project"
import { findAllEmployees } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { toast } from "sonner"
import { createAsset, findAssetById, updateAsset } from "@/services/ti/asset"
import { formatterCurrencyBRL, formatterSerialNumber } from "@/utils/formatters"

import {
	ASSET_BRANDS,
	ASSET_MODELS, 
	ASSET_STATUSES, 
	ASSET_SIZES, 
	ASSET_SUPPLIERS 
} from "@/utils/constants/ti-assets"

const CURRENT_STEP_COUNT = 2

const DEPARTMENT_MAPPING: Record<string, string[]> = {
	NOTEBOOKS: [],
	COMPUTADORES: [],
	TELAS: [],
	"CAMERAS TS CAST": ["AUDIOVISUAL", "MARKETING"],
	CELULARES: ["AUDIOVISUAL", "SOCIAL MEDIA", "MARKETING"],
}

const BRAND_MAPPING: Record<string, string[]> = {
	NOTEBOOK: ["DELL", "APPLE", "LENOVO", "ACER", "HP", "SAMSUNG", "VAIO", "POSITIVO", "ASUS"],
	COMPUTADOR: ["DELL", "LENOVO", "APPLE", "HP", "SAMSUNG", "ASUS", "GAMER", "TGT", "LOGITECH"],
	TELA: ["LG", "SAMSUNG", "DELL", "AOC", "PHILIPS", "BENQ", "PHILCO"],
	CELULAR: ["APPLE", "SAMSUNG", "LG", "ASUS"],
	"ACESSÓRIOS DE INFORMÁTICA": ["LOGITECH", "MULTILASER", "SEAGATE", "JBL", "SADES", "INTELBRAS"],
	"TS CAST ": ["CANON", "SONY", "PANASONIC", "FUJITSU", "NOVADIGITAL", "ULANZI", "BOYA", "ZHIYUN", "YONGNUO DIGITAL", "BATMAX"],
	"CÂMERAS TS CAST": ["CANON", "SONY", "PANASONIC"],
}

const MODEL_MAPPING: Record<string, string[]> = {
	NOTEBOOK: [
		"ASPIRE",
		"MACBOOK",
		"LATITUDE",
		"THINKPAD",
		"AIR5",
		"VJP155F11X",
		"PCG",
		"B330",
		"INSPIRON",
		"G3",
		"350X",
		"ODYSSEY",
		"BOOK E30",
		"GALAXY BOOK2",
		"VIVOBOOK",
		"VOSTRO",
		"IDEAPAD",
	],
	CELULAR: ["IPHONE", "SAMSUNG A06", "IPHONE 15 PRO"],
	"ACESSÓRIOS DE INFORMÁTICA": ["ZIGBEE 3.0", "NVIDIA GEFORCE", "H390"],
}

const ASSET_TYPE_OPTIONS = [
	"ACESSÓRIOS DE DECORAÇÃO",
	"ACESSÓRIOS DE INFORMÁTICA",
	"ACESSÓRIOS TS CAST",
	"ARMÁRIOS",
	"AUTOMAÇÃO",
	"BIBLIOTECA TS",
	"CADEIRAS",
	"CAIXA DE FERRAMENTA",
	"CÂMERAS TS CAST",
	"CELULARES",
	"COMPUTADORES",
	"CONTROLES",
	"DESCOMPRESSÃO",
	"ELETRODOMÉSTICO",
	"MESAS",
	"MÓVEIS PLANEJADOS",
	"NOTEBOOKS",
	"PATRIMÔNIO DESCARTADO",
	"SOFÁ",
	"TELAS",
	"TELEVISÃO",
]

const normalize = (str: string) =>
	str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toUpperCase()

const DEPARTMENT_NAME_MAPPING: Record<string, string> = {
	"Research and Development": "Pesquisa & Desenvolvimento",
	"Strategic Manager": "Gestão Estratégica",
	"Humam Resources": "Recursos Humanos",
	"Project Manager": "Gestão de Projetos",
}

const formatDepartmentLabel = (dept: string): string =>
	DEPARTMENT_NAME_MAPPING[dept] ||
	dept
		.replace(/_/g, " ")
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase())


export default function AssetRegistrationPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const editId = searchParams.get("id")
	const isEditMode = !!editId

	const [currentStep, setCurrentStep] = useState(1)
	const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined)
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const [assetType, setAssetType] = useState("")
	const [department, setDepartment] = useState("")
	const [size, setSize] = useState("")
	const [departments, setDepartments] = useState<string[]>([])
	const [asanaDepartmentsBySection, setAsanaDepartmentsBySection] = useState<Record<string, string[]>>({})
	const [sizes, setSizes] = useState<AsanaEnumOption[]>(ASSET_SIZES)
	const [suppliers, setSuppliers] = useState<string[]>(ASSET_SUPPLIERS.sort())
	const [selectedSupplier, setSelectedSupplier] = useState("")
	const [statuses, setStatuses] = useState<AsanaEnumOption[]>(ASSET_STATUSES)
	const [selectedStatus, setSelectedStatus] = useState("")
	const [brands, setBrands] = useState<AsanaEnumOption[]>(ASSET_BRANDS)
	const [selectedBrand, setSelectedBrand] = useState("")
	const [loadingDepartments, setLoadingDepartments] = useState(true)
	const [loadingSizes, setLoadingSizes] = useState(false)
	const [loadingSuppliers, setLoadingSuppliers] = useState(false)
	const [loadingStatuses, setLoadingStatuses] = useState(false)
	const [loadingBrands, setLoadingBrands] = useState(false)
	const [models, setModels] = useState<AsanaEnumOption[]>(ASSET_MODELS)
	const [selectedModel, setSelectedModel] = useState("")
	const [loadingModels, setLoadingModels] = useState(false)
	const [allEmployees, setAllEmployees] = useState<Employee[]>([])
	const [employeeSearch, setEmployeeSearch] = useState("")
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
	const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false)
	const employeeDropdownRef = useRef<HTMLDivElement>(null)

	const [serialNumber, setSerialNumber] = useState("0000")
	const [value, setValue] = useState("")
	const [additionalInfo, setAdditionalInfo] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const loadDepartments = async () => {
			try {
				const employees = await findAllEmployees()
				setAllEmployees(employees)
				const uniqueDepartments = [
					...new Set(
						employees
							.map((emp) => emp.department)
							.filter((dept) => dept !== "")
					),
				]
				setDepartments(uniqueDepartments)
			} catch {
				setDepartments([])
			} finally {
				setLoadingDepartments(false)
			}
		}

		loadDepartments()

		const handleClickOutside = (event: MouseEvent) => {
			if (
				employeeDropdownRef.current &&
				!employeeDropdownRef.current.contains(event.target as Node)
			) {
				setIsEmployeeDropdownOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	useEffect(() => {
		const loadAsanaDepartments = async () => {
			try {
				const tasks = await findProjectTasks()
				const sectionDepts: Record<string, Set<string>> = {}

				for (const task of tasks) {
					const sectionName = task.memberships?.[0]?.section?.name
					if (!sectionName) continue

					const deptField = task.custom_fields?.find(
						(cf) => cf.name.toUpperCase() === "DEPARTAMENTO"
					)
					if (!deptField?.display_value) continue

					const normalizedSection = normalize(sectionName)
					if (!sectionDepts[normalizedSection]) sectionDepts[normalizedSection] = new Set()
					sectionDepts[normalizedSection].add(deptField.display_value)
				}

				const result: Record<string, string[]> = {}
				for (const [key, set] of Object.entries(sectionDepts)) {
					result[key] = Array.from(set).sort()
				}
				setAsanaDepartmentsBySection(result)
			} catch {
				// Fallback: empty map, will show all departments
			}
		}

		loadAsanaDepartments()
	}, [])

	useEffect(() => {
		if (!editId) return

		const loadAssetForEdit = async () => {
			try {
				const asset = await findAssetById(editId)

				setAssetType(asset.tipo_patrimonio || "")
				setDepartment(asset.departamento || "")
				setSelectedBrand(asset.marca || "")
				setSelectedModel(asset.modelo_completo || "")
				setSerialNumber(formatterSerialNumber(asset.numero_serie || ""))
				setSize(asset.tamanho || "")
				setSelectedStatus(asset.status || "")
				setSelectedSupplier(asset.fornecedor || "")
				setAdditionalInfo(asset.informacoes_adicionais || "")

				if (asset.valor != null) {
					setValue(formatterCurrencyBRL(String(asset.valor)))
				}

				if (asset.data_compra) {
					try {
						const parsed = parse(asset.data_compra, "dd/MM/yyyy", new Date())
						if (!isNaN(parsed.getTime())) {
							setPurchaseDate(parsed)
						}
					} catch {
						// Date parsing failed, leave empty
					}
				}

				if (asset.id_colaborador && typeof asset.id_colaborador !== "string") {
					const employee = asset.id_colaborador as Employee
					setSelectedEmployee(employee)
					setEmployeeSearch(employee.name || "")
				}
			} catch {
				toast.error("Erro ao carregar dados do patrimônio.")
				router.push("/ti/controle-patrimonios")
			}
		}

		loadAssetForEdit()
	}, [editId, router])

	const validateStep1 = () => {
		if (!assetType) {
			toast.error("Selecione o tipo de patrimônio")
			return false
		}
		if (!department) {
			toast.error("Selecione o departamento")
			return false
		}
		if (!selectedBrand) {
			toast.error("Selecione a marca")
			return false
		}
		if (!selectedModel) {
			toast.error("Selecione o modelo")
			return false
		}
		if (!serialNumber) {
			toast.error("Digite o número de série")
			return false
		}
		return true
	}

	const validateStep2 = () => {
		if (!size) {
			toast.error("Selecione o tamanho")
			return false
		}
		if (!selectedStatus) {
			toast.error("Selecione o status")
			return false
		}
		if (!value) {
			toast.error("Digite o valor")
			return false
		}
		if (!purchaseDate) {
			toast.error("Selecione a data da compra")
			return false
		}
		if (!selectedSupplier) {
			toast.error("Selecione o fornecedor")
			return false
		}
		if (!selectedEmployee) {
			toast.error("Selecione um colaborador para vincular")
			return false
		}
		return true
	}

	const handleAdvance = () => {
		if (validateStep1()) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		} else {
			router.back()
		}
	}

	const handleSubmit = async () => {
		if (!validateStep2()) return

		setIsSubmitting(true)
		try {
			// Convert currency string "R$ 1.000,00" to number
			const numericValue = parseFloat(
				value
					.replace("R$", "")
					.replace(/\./g, "")
					.replace(",", ".")
					.trim()
			)

			const payload = {
				tipo_patrimonio: assetType,
				categoria: assetType,
				departamento: department,
				marca: selectedBrand,
				modelo_completo: selectedModel,
				numero_serie: serialNumber,
				tamanho: size,
				status: selectedStatus,
				valor: isNaN(numericValue) ? 0 : numericValue,
				data_compra: purchaseDate ? format(purchaseDate, "dd/MM/yyyy") : undefined,
				fornecedor: selectedSupplier,
				informacoes_adicionais: additionalInfo,
				id_colaborador: selectedEmployee ? { id: selectedEmployee.id } : undefined,
			}

			if (isEditMode && editId) {
				await updateAsset(editId, payload)
				toast.success("Patrimônio atualizado com sucesso!")
			} else {
				await createAsset(payload)
				toast.success("Patrimônio cadastrado com sucesso!")
			}

			router.push("/ti/controle-patrimonios")
		} catch {
			toast.error(isEditMode ? "Erro ao atualizar patrimônio. Tente novamente." : "Erro ao cadastrar patrimônio. Tente novamente.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex flex-col w-full gap-8 pb-10">
			{/* Breadcrumbs */}
			<div className="px-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/ti" className="text-sm text-[#A09E9C] hover:text-white">
								Dashboard
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-[#A09E9C] mx-2" />
						<BreadcrumbItem>
							<BreadcrumbLink href="/ti/controle-patrimonios" className="text-sm text-[#A09E9C] hover:text-white">
								Controle de Patrimônios
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-[#A09E9C] mx-2" />
						<BreadcrumbItem>
							<BreadcrumbPage className="text-sm text-default-orange">
								{isEditMode ? "Editar Patrimônio" : "Cadastro de Patrimônios"}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			{/* Main Container */}
			<div className="mx-6 p-8 bg-transparent border border-[#332C24] rounded-lg">
				{/* Top Bar Navigation */}
				<div className="flex items-center gap-6 mb-8">
					<Button
						variant="outline"
						className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 py-2 px-4 h-9 gap-2 font-normal rounded flex items-center cursor-pointer"
						onClick={handleBack}
					>
						<ArrowLeft size={16} />
						Voltar
					</Button>
					<h2 className="text-default-orange text-base font-bold">
						{isEditMode ? "Editar Patrimônio" : "Cadastro de Patrimônios"}
					</h2>
				</div>

				{/* Header */}
				<h1 className="text-default-orange text-[22px] font-bold text-center mb-12">
					{isEditMode ? "Editar Patrimônio" : "Cadastro de Patrimônios"}
				</h1>

				{/* Step 1 */}
				{currentStep === 1 && (
					<div className="grid grid-cols-[1fr_1px_1fr] gap-12 items-start py-4">
						{/* Left Column */}
						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Tipo de patrimônio
								</span>
								<Select value={assetType} onValueChange={setAssetType}>
									<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
										<SelectValue placeholder="Selecione o tipo" />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{ASSET_TYPE_OPTIONS.map((type) => (
											<SelectItem
												key={type}
												value={type}
												className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
											>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Departamento
								</span>
								<Select 
									disabled={!assetType} 
									value={department} 
									onValueChange={setDepartment}
								>
									<SelectTrigger className={`bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C] ${!assetType ? 'opacity-50 cursor-not-allowed' : ''}`}>
										<SelectValue placeholder={!assetType ? "Selecione o tipo primeiro" : (loadingDepartments ? "Carregando..." : "Selecione o departamento")} />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{departments
											.filter((dept) => {
												if (!assetType) return false
												const normalizedAsset = normalize(assetType)

												// Hardcoded mapping for types that already have filters
												const hardcodedDepts = DEPARTMENT_MAPPING[normalizedAsset]
												if (hardcodedDepts !== undefined) {
													if (hardcodedDepts.length === 0) return true
													return hardcodedDepts.some(
														(allowed) => normalize(dept).includes(normalize(allowed))
													)
												}

												// Asana-derived departments for remaining types
												const asanaDepts = asanaDepartmentsBySection[normalizedAsset]
												if (!asanaDepts || asanaDepts.length === 0) return true
												return asanaDepts.some(
													(asanaDept) =>
														normalize(dept).includes(normalize(asanaDept)) ||
														normalize(asanaDept).includes(normalize(dept))
												)
											})
											.map((dept) => (
												<SelectItem
													key={dept}
													value={dept}
													className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
												>
													{formatDepartmentLabel(dept)}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Vertical Divider */}
						<div className="w-px h-full min-h-[350px] bg-[#332C24]"></div>

						{/* Right Column */}
						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Marca
								</span>
								<Select 
									disabled={!assetType} 
									value={selectedBrand} 
									onValueChange={setSelectedBrand}
								>
									<SelectTrigger className={`bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C] ${!assetType ? 'opacity-50 cursor-not-allowed' : ''}`}>
										<SelectValue placeholder={!assetType ? "Selecione o tipo primeiro" : (loadingBrands ? "Carregando..." : "Selecione a marca")} />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{brands
											.filter((brand) => {
												if (!assetType) return false
												const normalizedAsset = normalize(assetType)
												const allowedBrands = BRAND_MAPPING[normalizedAsset] || []
												if (allowedBrands.length === 0) return true // Fallback: show all if no mapping
												return allowedBrands.some(
													(b) => normalize(brand.name || "").includes(normalize(b))
												)
											})
											.map((brand) => (
												<SelectItem
													key={brand.gid}
													value={brand.name}
													className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
												>
													{brand.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Modelo Completo
								</span>
								<Select
									disabled={!assetType}
									value={selectedModel}
									onValueChange={setSelectedModel}
								>
									<SelectTrigger
										className={`bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C] ${
											!assetType ? "opacity-50 cursor-not-allowed" : ""
										}`}
									>
										<SelectValue
											placeholder={
												!assetType
													? "Selecione o tipo primeiro"
													: loadingModels
													? "Carregando..."
													: "Selecione o modelo"
											}
										/>
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{models
											.filter((model) => {
												if (!assetType) return false
												const normalizedAsset = normalize(assetType)
												const allowedModels = MODEL_MAPPING[normalizedAsset] || []
												if (allowedModels.length === 0) return true // Fallback
												return allowedModels.some((m) =>
													normalize(model.name || "").includes(normalize(m))
												)
											})
											.map((model) => (
												<SelectItem
													key={model.gid}
													value={model.name}
													className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
												>
													{model.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Nº de Série
								</span>
								<Input
									type="text"
									placeholder="0000"
									value={serialNumber}
									onChange={(e) => setSerialNumber(formatterSerialNumber(e.target.value))}
									className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full placeholder:text-[#A09E9C]"
								/>
							</div>

							<Button
								className="bg-default-orange hover:bg-default-orange/90 text-black font-bold h-14 w-full mt-2 gap-2 text-[15px] rounded cursor-pointer"
								onClick={handleAdvance}
							>
								<ArrowRightFromLine size={18} />
								Avançar
							</Button>
						</div>
					</div>
				)}

				{/* Step 2 */}
				{currentStep === 2 && (
					<div className="grid grid-cols-[1fr_1px_1fr] gap-12 items-start py-4">
						{/* Left Column */}
						<div className="flex flex-col gap-8">
							{/* Tamanho + Status */}
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2">
									<span className="text-white font-medium text-sm">
										Tamanho
									</span>
									<Select value={size} onValueChange={setSize}>
										<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
											<SelectValue placeholder={loadingSizes ? "Carregando..." : "Selecione o tamanho"} />
										</SelectTrigger>
										<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
											{sizes
												.filter((s) => s.name?.toLowerCase() !== "analisar")
												.map((sizeOption) => (
													<SelectItem
														key={sizeOption.gid}
														value={sizeOption.name}
														className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
													>
														{sizeOption.name}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								</div>

								<div className="flex flex-col gap-2">
									<span className="text-white font-medium text-sm">
										Status
									</span>
									<Select value={selectedStatus} onValueChange={setSelectedStatus}>
										<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
											<SelectValue placeholder={loadingStatuses ? "Carregando..." : "Selecione o status"} />
										</SelectTrigger>
										<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
											{statuses.map((status) => (
												<SelectItem
													key={status.gid}
													value={status.name}
													className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
												>
													{status.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Valor + Data da compra */}
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2">
									<span className="text-white font-medium text-sm">
										Valor
									</span>
									<Input
										type="text"
										placeholder="R$10.000,00"
										value={value}
										onChange={(e) => setValue(formatterCurrencyBRL(e.target.value))}
										className="bg-[#0C0907] border-[#332C24] text-[#8E8B87] p-3 rounded h-auto w-full placeholder:text-[#8E8B87]"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<span className="text-white font-medium text-sm">
										Data da compra
									</span>
									<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
										<PopoverTrigger asChild>
											<button
												type="button"
												className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full text-left cursor-pointer hover:bg-[#332C24]/30 transition-colors"
											>
												<span className="flex-1 text-sm">
													{purchaseDate
														? format(purchaseDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
														: "Selecione a data"}
												</span>
												<CalendarIcon size={18} className="text-[#A09E9C]" />
											</button>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0 bg-[#1A1510] border-[#332C24]"
											align="start"
										>
											<Calendar
												mode="single"
												selected={purchaseDate}
												onSelect={(date) => {
													setPurchaseDate(date)
													setIsCalendarOpen(false)
												}}
												locale={ptBR}
												className="rounded-md"
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>

							{/* Fornecedor */}
							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Fornecedor
								</span>
								<Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
									<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
										<SelectValue placeholder={loadingSuppliers ? "Carregando..." : "Selecione o fornecedor"} />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{suppliers.map((supplier, index) => (
											<SelectItem
												key={`${supplier}-${index}`}
												value={String(supplier)}
												className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
											>
												{String(supplier)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Vertical Divider */}
						<div className="w-px h-full min-h-[350px] bg-[#332C24]"></div>

						{/* Right Column */}
						<div className="flex flex-col gap-6">
							{/* Informações adicionais */}
							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Informações adicionais
								</span>
								<Textarea
									placeholder="Informações adicionais"
									value={additionalInfo}
									onChange={(e) => setAdditionalInfo(e.target.value)}
									className="bg-[#0C0907] border-[#332C24] text-[#8E8B87] p-3 rounded min-h-[100px] resize-y w-full placeholder:text-[#8E8B87]"
								/>
							</div>

							{/* Vincular patrimônio */}
							<div className="flex flex-col gap-2 mt-2">
								<span className="text-white font-medium text-sm">
									Vincular patrimônio à um colaborador
								</span>

								{/* Search Input */}
								<div className="relative" ref={employeeDropdownRef}>
									<div className="flex items-center bg-[#0C0907] border border-[#332C24] rounded px-4 py-3">
										<Search size={18} className="text-white mr-3" />
										<input
											type="text"
											placeholder="Buscar colaborador..."
											className="flex-1 bg-transparent border-none outline-none text-sm text-[#8E8B87] placeholder:text-[#8E8B87]"
											value={employeeSearch}
											onChange={(e) => {
												setEmployeeSearch(e.target.value)
												setIsEmployeeDropdownOpen(true)
											}}
											onFocus={() => setIsEmployeeDropdownOpen(true)}
										/>
										<ArrowDown size={18} className="text-white" />
									</div>

									{/* Employee Dropdown */}
									{isEmployeeDropdownOpen && (
										<div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#1A1510] border border-[#332C24] rounded shadow-lg max-h-48 overflow-y-auto">
											{allEmployees
												.filter(emp => {
													if (!employeeSearch) return true
													return (
														emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) || 
														emp.email.toLowerCase().includes(employeeSearch.toLowerCase())
													)
												})
												.map(emp => (
													<div
														key={emp.id}
														className="p-3 hover:bg-[#332C24] cursor-pointer text-sm text-white border-b border-[#332C24] last:border-0"
														onClick={() => {
															setSelectedEmployee(emp)
															setEmployeeSearch(emp.name)
															setIsEmployeeDropdownOpen(false)
														}}
													>
														<div className="font-medium text-default-orange">{emp.name}</div>
														<div className="text-[#A09E9C] text-xs">{emp.email}</div>
													</div>
												))}
										</div>
									)}
								</div>

								{/* Selected Employee Card */}
								{selectedEmployee && (
									<div className="bg-[#0C0907] border border-[#332C24] rounded p-4 flex flex-col gap-2">
										<span className="text-white text-sm font-medium">
											{selectedEmployee.name}
										</span>
										<span className="text-[#8E8B87] text-sm">
											{selectedEmployee.email}
										</span>
									</div>
								)}
							</div>

							{/* Finalizar Cadastro */}
							<Button
								className="bg-default-orange hover:bg-default-orange/90 text-black font-bold h-[52px] w-full mt-2 gap-2 text-[15px] rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
								onClick={handleSubmit}
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<div className="flex items-center gap-2">
										<div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
										Enviando...
									</div>
								) : (
									<>
										<Rocket size={18} />
										{isEditMode ? "Salvar Alterações" : "Finalizar Cadastro"}
									</>
								)}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
