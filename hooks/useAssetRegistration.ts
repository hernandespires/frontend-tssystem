import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format, parse } from "date-fns"
import { toast } from "sonner"

import { findCustomFieldEnumOptions, findProjectTasks } from "@/services/asana/project"
import { findAllEmployees } from "@/services/humanResources/employee"
import { createAsset, findAssetById, updateAsset } from "@/services/ti/asset"
import { formatterCurrencyBRL, formatterSerialNumber } from "@/utils/formatters"
import { formatDepartmentLabel, isDepartmentMapped, normalizeText } from "@/utils/department"
import { AsanaEnumOption } from "@/types/services/asana/project"
import { Employee } from "@/types/services/humanResources/employee"
import {
	ASSET_BRANDS,
	ASSET_MODELS,
	ASSET_STATUSES,
	ASSET_SIZES,
	ASSET_SUPPLIERS,
	DEPARTMENT_FILTER_BY_ASSET_TYPE,
	BRAND_FILTER_BY_ASSET_TYPE,
	MODEL_FILTER_BY_ASSET_TYPE,
} from "@/utils/constants/ti-assets"

interface AssetRegistrationState {
	currentStep: number
	assetType: string
	department: string
	selectedBrand: string
	selectedModel: string
	serialNumber: string
	size: string
	selectedStatus: string
	selectedSupplier: string
	purchaseDate: Date | undefined
	value: string
	additionalInfo: string
	selectedEmployee: Employee | null
	employeeSearch: string
	isEmployeeDropdownOpen: boolean
	isCalendarOpen: boolean
	isSubmitting: boolean
	loadingDepartments: boolean
}

interface AssetRegistrationData {
	departments: string[]
	allEmployees: Employee[]
	sizes: AsanaEnumOption[]
	statuses: AsanaEnumOption[]
	brands: AsanaEnumOption[]
	models: AsanaEnumOption[]
	suppliers: string[]
	asanaDepartmentsBySection: Record<string, string[]>
}

export interface UseAssetRegistrationReturn {
	state: AssetRegistrationState
	data: AssetRegistrationData
	isEditMode: boolean
	setCurrentStep: (step: number) => void
	setAssetType: (type: string) => void
	setDepartment: (dept: string) => void
	setSelectedBrand: (brand: string) => void
	setSelectedModel: (model: string) => void
	setSerialNumber: (serial: string) => void
	setSize: (size: string) => void
	setSelectedStatus: (status: string) => void
	setSelectedSupplier: (supplier: string) => void
	setPurchaseDate: (date: Date | undefined) => void
	setValue: (val: string) => void
	setAdditionalInfo: (info: string) => void
	setSelectedEmployee: (emp: Employee | null) => void
	setEmployeeSearch: (search: string) => void
	setIsEmployeeDropdownOpen: (open: boolean) => void
	setIsCalendarOpen: (open: boolean) => void
	handleSerialNumberChange: (rawValue: string) => void
	handleValueChange: (rawValue: string) => void
	handleAdvance: () => void
	handleBack: () => void
	handleSubmit: () => Promise<void>
	filterDepartments: (departments: string[]) => string[]
	filterBrands: (brands: AsanaEnumOption[]) => AsanaEnumOption[]
	filterModels: (models: AsanaEnumOption[]) => AsanaEnumOption[]
}

function parseCurrencyToNumber(currencyString: string): number {
	const numericValue = parseFloat(
		currencyString.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
	)
	return isNaN(numericValue) ? 0 : numericValue
}

function deduplicateDepartments(rawDepartments: string[]): string[] {
	const uniqueByLabel = new Map<string, string>()

	rawDepartments.forEach((dept) => {
		const label = formatDepartmentLabel(dept)
		const existing = uniqueByLabel.get(label)
		const isMapped = isDepartmentMapped(dept)
		const existingIsMapped = existing ? isDepartmentMapped(existing) : false

		if (!existing || (isMapped && !existingIsMapped)) {
			uniqueByLabel.set(label, dept)
		}
	})

	return Array.from(uniqueByLabel.values()).sort((a, b) =>
		formatDepartmentLabel(a).localeCompare(formatDepartmentLabel(b))
	)
}

export function useAssetRegistration(): UseAssetRegistrationReturn {
	const router = useRouter()
	const searchParams = useSearchParams()
	const editId = searchParams.get("id")
	const isEditMode = !!editId

	const [currentStep, setCurrentStep] = useState(1)
	const [assetType, setAssetType] = useState("")
	const [department, setDepartment] = useState("")
	const [selectedBrand, setSelectedBrand] = useState("")
	const [selectedModel, setSelectedModel] = useState("")
	const [serialNumber, setSerialNumber] = useState("0000")
	const [size, setSize] = useState("")
	const [selectedStatus, setSelectedStatus] = useState("")
	const [selectedSupplier, setSelectedSupplier] = useState("")
	const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined)
	const [value, setValue] = useState("")
	const [additionalInfo, setAdditionalInfo] = useState("")
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
	const [employeeSearch, setEmployeeSearch] = useState("")
	const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false)
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [loadingDepartments, setLoadingDepartments] = useState(true)

	const [departments, setDepartments] = useState<string[]>([])
	const [allEmployees, setAllEmployees] = useState<Employee[]>([])
	const [asanaDepartmentsBySection, setAsanaDepartmentsBySection] = useState<Record<string, string[]>>({})

	const handleSerialNumberChange = useCallback((rawValue: string) => {
		setSerialNumber(formatterSerialNumber(rawValue))
	}, [])

	const handleValueChange = useCallback((rawValue: string) => {
		setValue(formatterCurrencyBRL(rawValue))
	}, [])

	// Load departments (employees + Asana enum)
	useEffect(() => {
		const loadDepartments = async () => {
			try {
				const [employees, asanaDepartmentOptions] = await Promise.all([
					findAllEmployees(),
					findCustomFieldEnumOptions("DEPARTAMENTO").catch(() => []),
				])

				setAllEmployees(employees)

				const employeeDepartments = employees
					.map((emp) => emp.department)
					.filter((dept) => dept !== "")
				const asanaDepartmentNames = asanaDepartmentOptions.map((opt) => opt.name)

				setDepartments(deduplicateDepartments([...employeeDepartments, ...asanaDepartmentNames]))
			} catch {
				setDepartments([])
			} finally {
				setLoadingDepartments(false)
			}
		}

		loadDepartments()
	}, [])

	// Load Asana departments by section (for filtering by asset type)
	useEffect(() => {
		const loadAsanaDepartmentsBySection = async () => {
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

					const normalizedSection = normalizeText(sectionName)
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

		loadAsanaDepartmentsBySection()
	}, [])

	// Load asset for edit mode
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
						if (!isNaN(parsed.getTime())) setPurchaseDate(parsed)
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

	const validateStep1 = useCallback((): boolean => {
		const validations = [
			{ condition: !assetType, message: "Selecione o tipo de patrimônio" },
			{ condition: !department, message: "Selecione o departamento" },
			{ condition: !selectedBrand, message: "Selecione a marca" },
			{ condition: !selectedModel, message: "Selecione o modelo" },
			{ condition: !serialNumber, message: "Digite o número de série" },
		]

		const firstError = validations.find((v) => v.condition)
		if (firstError) {
			toast.error(firstError.message)
			return false
		}
		return true
	}, [assetType, department, selectedBrand, selectedModel, serialNumber])

	const validateStep2 = useCallback((): boolean => {
		const validations = [
			{ condition: !size, message: "Selecione o tamanho" },
			{ condition: !selectedStatus, message: "Selecione o status" },
			{ condition: !value, message: "Digite o valor" },
			{ condition: !purchaseDate, message: "Selecione a data da compra" },
			{ condition: !selectedSupplier, message: "Selecione o fornecedor" },
			{ condition: !selectedEmployee, message: "Selecione um colaborador para vincular" },
		]

		const firstError = validations.find((v) => v.condition)
		if (firstError) {
			toast.error(firstError.message)
			return false
		}
		return true
	}, [size, selectedStatus, value, purchaseDate, selectedSupplier, selectedEmployee])

	const handleAdvance = useCallback(() => {
		if (validateStep1()) setCurrentStep((prev) => prev + 1)
	}, [validateStep1])

	const handleBack = useCallback(() => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1)
		} else {
			router.back()
		}
	}, [currentStep, router])

	const handleSubmit = useCallback(async () => {
		if (!validateStep2()) return

		setIsSubmitting(true)
		try {
			const payload = {
				tipo_patrimonio: assetType,
				categoria: assetType,
				departamento: department,
				marca: selectedBrand,
				modelo_completo: selectedModel,
				numero_serie: serialNumber,
				tamanho: size,
				status: selectedStatus,
				valor: parseCurrencyToNumber(value),
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
			toast.error(
				isEditMode
					? "Erro ao atualizar patrimônio. Tente novamente."
					: "Erro ao cadastrar patrimônio. Tente novamente."
			)
		} finally {
			setIsSubmitting(false)
		}
	}, [
		validateStep2, assetType, department, selectedBrand, selectedModel,
		serialNumber, size, selectedStatus, value, purchaseDate,
		selectedSupplier, additionalInfo, selectedEmployee, isEditMode, editId, router,
	])

	const filterDepartments = useCallback(
		(depts: string[]): string[] => {
			if (!assetType) return []
			const normalizedAsset = normalizeText(assetType)

			return depts.filter((dept) => {
				const hardcodedDepts = DEPARTMENT_FILTER_BY_ASSET_TYPE[normalizedAsset]
				if (hardcodedDepts !== undefined) {
					if (hardcodedDepts.length === 0) return true
					return hardcodedDepts.some((allowed) =>
						normalizeText(dept).includes(normalizeText(allowed))
					)
				}

				const asanaDepts = asanaDepartmentsBySection[normalizedAsset]
				if (!asanaDepts || asanaDepts.length === 0) return true
				return asanaDepts.some(
					(asanaDept) =>
						normalizeText(dept).includes(normalizeText(asanaDept)) ||
						normalizeText(asanaDept).includes(normalizeText(dept))
				)
			})
		},
		[assetType, asanaDepartmentsBySection]
	)

	const filterBrands = useCallback(
		(brandsList: AsanaEnumOption[]): AsanaEnumOption[] => {
			if (!assetType) return []
			const normalizedAsset = normalizeText(assetType)
			const allowedBrands = BRAND_FILTER_BY_ASSET_TYPE[normalizedAsset] || []
			if (allowedBrands.length === 0) return brandsList
			return brandsList.filter((brand) =>
				allowedBrands.some((b) => normalizeText(brand.name || "").includes(normalizeText(b)))
			)
		},
		[assetType]
	)

	const filterModels = useCallback(
		(modelsList: AsanaEnumOption[]): AsanaEnumOption[] => {
			if (!assetType) return []
			const normalizedAsset = normalizeText(assetType)
			const allowedModels = MODEL_FILTER_BY_ASSET_TYPE[normalizedAsset] || []
			if (allowedModels.length === 0) return modelsList
			return modelsList.filter((model) =>
				allowedModels.some((m) => normalizeText(model.name || "").includes(normalizeText(m)))
			)
		},
		[assetType]
	)

	return {
		state: {
			currentStep, assetType, department, selectedBrand, selectedModel,
			serialNumber, size, selectedStatus, selectedSupplier, purchaseDate,
			value, additionalInfo, selectedEmployee, employeeSearch,
			isEmployeeDropdownOpen, isCalendarOpen, isSubmitting, loadingDepartments,
		},
		data: {
			departments, allEmployees, sizes: ASSET_SIZES, statuses: ASSET_STATUSES,
			brands: ASSET_BRANDS, models: ASSET_MODELS,
			suppliers: ASSET_SUPPLIERS.slice().sort(), asanaDepartmentsBySection,
		},
		isEditMode,
		setCurrentStep, setAssetType, setDepartment, setSelectedBrand,
		setSelectedModel, setSerialNumber, setSize, setSelectedStatus,
		setSelectedSupplier, setPurchaseDate, setValue, setAdditionalInfo,
		setSelectedEmployee, setEmployeeSearch, setIsEmployeeDropdownOpen,
		setIsCalendarOpen, handleSerialNumberChange, handleValueChange,
		handleAdvance, handleBack, handleSubmit,
		filterDepartments, filterBrands, filterModels,
	}
}
