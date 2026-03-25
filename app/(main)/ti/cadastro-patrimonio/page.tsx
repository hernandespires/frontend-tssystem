"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
	ArrowLeft,
	ArrowRightFromLine,
	ChevronDown,
	Search,
	ArrowDown,
	Rocket,
	Calendar as CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"

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
import { findCustomFieldEnumOptions, findSuppliersByCategories } from "@/services/asana/project"
import { AsanaEnumOption } from "@/types/services/asana/project"
import { findAllEmployees } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { toast } from "sonner"
import { createAsset } from "@/services/ti/asset"
import { formatterCurrencyBRL } from "@/utils/formatters"

const CURRENT_STEP_COUNT = 2
const ALLOWED_CATEGORIES = [
	"NOTEBOOKS",
	"COMPUTADORES",
	"TELAS",
	"ACESSÓRIOS DE INFORMÁTICA",
	"CELULARES",
	"CÂMERAS TS CAST",
	"TS CAST ",
	"CARREGADOR NOTEBOOK",
	"ESTABILIZADOR DE CELULAR",
	"CARREGADOR DE CELULAR",
	"CAMERA",
]

const DEPARTMENT_MAPPING: Record<string, string[]> = {
	NOTEBOOKS: [], // All
	COMPUTADORES: [], // All
	TELAS: [], // All
	CAMERA: ["AUDIOVISUAL", "MARKETING"],
	"CAMERAS TS CAST": ["AUDIOVISUAL", "MARKETING"],
	CELULARES: ["AUDIOVISUAL", "SOCIAL MEDIA", "MARKETING"],
	"CARREGADOR NOTEBOOK": [], // All
	"ESTABILIZADOR DE CELULAR": ["AUDIOVISUAL", "SOCIAL MEDIA", "MARKETING"],
	"CARREGADOR DE CELULAR": ["AUDIOVISUAL", "SOCIAL MEDIA", "MARKETING"],
}

const BRAND_MAPPING: Record<string, string[]> = {
	NOTEBOOKS: ["DELL", "APPLE", "LENOVO", "ACER", "HP", "SAMSUNG", "VAIO", "POSITIVO", "ASUS"],
	COMPUTADORES: ["DELL", "LENOVO", "APPLE", "HP", "SAMSUNG", "ASUS", "GAMER", "TGT", "LOGITECH"],
	TELAS: ["LG", "SAMSUNG", "DELL", "AOC", "PHILIPS", "BENQ", "PHILCO"],
	CELULARES: ["APPLE", "SAMSUNG", "LG", "ASUS"],
	"ACESSÓRIOS DE INFORMÁTICA": ["LOGITECH", "MULTILASER", "SEAGATE", "JBL", "SADES", "INTELBRAS"],
	"TS CAST ": ["CANON", "SONY", "PANASONIC", "FUJITSU", "NOVADIGITAL", "ULANZI", "BOYA", "ZHIYUN", "YONGNUO DIGITAL", "BATMAX"],
	"CÂMERAS TS CAST": ["CANON", "SONY", "PANASONIC"],
}

const MODEL_MAPPING: Record<string, string[]> = {
	NOTEBOOKS: [
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
	CELULARES: ["IPHONE", "SAMSUNG A06", "IPHONE 15 PRO"],
	"ACESSÓRIOS DE INFORMÁTICA": ["ZIGBEE 3.0", "NVIDIA GEFORCE", "H390"],
}

const MOCK_SUPPLIERS = [
	"DELL",
	"APPLE",
	"AMAZON",
	"KABUM",
	"MERCADO LIVRE",
	"ALIVE",
	"MAGALU",
	"AMERICANAS",
	"TS CAST",
]

const normalize = (str: string) =>
	str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toUpperCase()

const normalizedAllowed = ALLOWED_CATEGORIES.map(normalize)

export default function AssetRegistrationPage() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState(1)
	const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined)
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const [assetType, setAssetType] = useState("")
	const [department, setDepartment] = useState("")
	const [size, setSize] = useState("")
	const [categories, setCategories] = useState<AsanaEnumOption[]>([])
	const [departments, setDepartments] = useState<string[]>([])
	const [sizes, setSizes] = useState<AsanaEnumOption[]>([])
	const [suppliers, setSuppliers] = useState<string[]>([])
	const [selectedSupplier, setSelectedSupplier] = useState("")
	const [statuses, setStatuses] = useState<AsanaEnumOption[]>([])
	const [selectedStatus, setSelectedStatus] = useState("")
	const [brands, setBrands] = useState<AsanaEnumOption[]>([])
	const [selectedBrand, setSelectedBrand] = useState("")
	const [loadingCategories, setLoadingCategories] = useState(true)
	const [loadingDepartments, setLoadingDepartments] = useState(true)
	const [loadingSizes, setLoadingSizes] = useState(true)
	const [loadingSuppliers, setLoadingSuppliers] = useState(true)
	const [loadingStatuses, setLoadingStatuses] = useState(true)
	const [loadingBrands, setLoadingBrands] = useState(true)
	const [models, setModels] = useState<AsanaEnumOption[]>([])
	const [selectedModel, setSelectedModel] = useState("")
	const [loadingModels, setLoadingModels] = useState(true)
	const [allEmployees, setAllEmployees] = useState<Employee[]>([])
	const [employeeSearch, setEmployeeSearch] = useState("")
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
	const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false)
	const employeeDropdownRef = useRef<HTMLDivElement>(null)

	const [serialNumber, setSerialNumber] = useState("")
	const [value, setValue] = useState("")
	const [additionalInfo, setAdditionalInfo] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const options = await findCustomFieldEnumOptions("CATEGORIA")
				setCategories(options)
			} catch {
				setCategories([])
			} finally {
				setLoadingCategories(false)
			}
		}

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

		const loadSizes = async () => {
			try {
				const [hdOptions, ssdOptions] = await Promise.all([
					findCustomFieldEnumOptions("HD"),
					findCustomFieldEnumOptions("SSD"),
				])
				const combined = [...hdOptions, ...ssdOptions]
				const uniqueSizes = combined.filter(
					(option, index, self) =>
						self.findIndex((o) => o.name === option.name) === index
				)
				setSizes(uniqueSizes)
			} catch {
				setSizes([])
			} finally {
				setLoadingSizes(false)
			}
		}

		const loadSuppliers = async () => {
			try {
				const SUPPLIER_CATEGORIES = [
					"NOTEBOOKS",
					"COMPUTADORES",
					"TELAS",
					"ACESSÓRIOS DE INFORMÁTICA",
					"CELULARES",
					"CÂMERAS TS CAST",
				]
				const filteredSuppliers = await findSuppliersByCategories(SUPPLIER_CATEGORIES)
				const combined = [...new Set([...filteredSuppliers, ...MOCK_SUPPLIERS])]
				setSuppliers(combined.sort())
			} catch {
				setSuppliers([])
			} finally {
				setLoadingSuppliers(false)
			}
		}

		const loadStatuses = async () => {
			try {
				const options = await findCustomFieldEnumOptions("STATUS")
				setStatuses(options)
			} catch {
				setStatuses([])
			} finally {
				setLoadingStatuses(false)
			}
		}

		const loadBrands = async () => {
			try {
				const options = await findCustomFieldEnumOptions("MARCA")
				setBrands(options)
			} catch {
				setBrands([])
			} finally {
				setLoadingBrands(false)
			}
		}

		const loadModels = async () => {
			try {
				const options = await findCustomFieldEnumOptions("MODELO")
				setModels(options)
			} catch {
				setModels([])
			} finally {
				setLoadingModels(false)
			}
		}

		loadCategories()
		loadDepartments()
		loadSizes()
		loadSuppliers()
		loadStatuses()
		loadBrands()
		loadModels()

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

			await createAsset({
				tipo_patrimonio: assetType,
				categoria: assetType,
				departamento: department,
				marca: selectedBrand,
				modelo_completo: selectedModel,
				numero_serie: serialNumber,
				tamanho: size,
				status: selectedStatus,
				valor: isNaN(numericValue) ? 0 : numericValue,
				data_compra: purchaseDate ? purchaseDate.toISOString() : undefined,
				fornecedor: selectedSupplier,
				informacoes_adicionais: additionalInfo,
				id_colaborador: selectedEmployee ? { id: selectedEmployee.id } : undefined,
			})

			toast.success("Patrimônio cadastrado com sucesso!")
			router.push("/ti")
		} catch (error) {
			console.error("Error saving asset:", error)
			toast.error("Erro ao cadastrar patrimônio. Tente novamente.")
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
							<BreadcrumbPage className="text-sm text-default-orange">
								Cadastro de Patrimônios
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
						Cadastro de Patrimônios
					</h2>
				</div>

				{/* Header */}
				<h1 className="text-default-orange text-[22px] font-bold text-center mb-12">
					Cadastro de Patrimônios
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
										<SelectValue placeholder={loadingCategories ? "Carregando..." : "Selecione o tipo"} />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{(categories.filter((cat) => {
											const name = normalize(cat.name || "")
											return normalizedAllowed.some((allowed) =>
												name.includes(allowed) || allowed.includes(name)
											)
										}).length > 0
											? categories.filter((cat) => {
													const name = normalize(cat.name || "")
													return normalizedAllowed.some((allowed) =>
														name.includes(allowed) || allowed.includes(name)
													)
											  })
											: categories
										).map((category) => (
											<SelectItem
												key={category.gid}
												value={category.name}
												className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
											>
												{category.name}
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
												const allowedDepts = DEPARTMENT_MAPPING[normalizedAsset] || []
												if (allowedDepts.length === 0) return true // All departments allowed
												return allowedDepts.some(
													(allowed) => normalize(dept).includes(normalize(allowed))
												)
											})
											.map((dept) => (
												<SelectItem
													key={dept}
													value={dept}
													className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white"
												>
													{dept}
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
									placeholder="000120202020"
									value={serialNumber}
									onChange={(e) => setSerialNumber(e.target.value)}
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
														? format(purchaseDate, "MMMM dd, yyyy")
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
										Finalizar Cadastro
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
