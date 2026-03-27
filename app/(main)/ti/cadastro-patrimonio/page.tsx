"use client"

import { ArrowLeft, ArrowRightFromLine, Rocket, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import {
	Breadcrumb, BreadcrumbItem, BreadcrumbLink,
	BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EmployeeSearchDropdown from "@/components/EmployeeSearchDropdown"
import SearchableDropdown from "@/components/SearchableDropdown"
import { useAssetRegistration } from "@/hooks/useAssetRegistration"
import { formatDepartmentLabel } from "@/utils/department"
import { ASSET_TYPE_OPTIONS } from "@/utils/constants/ti-assets"

export default function AssetRegistrationPage() {
	const {
		state, data, isEditMode,
		setAssetType, setDepartment, setSelectedBrand, setSelectedModel,
		setSize, setSelectedStatus, setSelectedSupplier, setPurchaseDate,
		setAdditionalInfo, setSelectedEmployee, setEmployeeSearch,
		setIsEmployeeDropdownOpen, setIsCalendarOpen,
		handleSerialNumberChange, handleValueChange,
		handleAdvance, handleBack, handleSubmit,
		filterDepartments, filterBrands, filterModels,
	} = useAssetRegistration()

	const pageTitle = isEditMode ? "Editar Patrimônio" : "Cadastro de Patrimônios"

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
							<BreadcrumbPage className="text-sm text-default-orange">{pageTitle}</BreadcrumbPage>
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
					<h2 className="text-default-orange text-base font-bold">{pageTitle}</h2>
				</div>

				{/* Header */}
				<h1 className="text-default-orange text-[22px] font-bold text-center mb-12">{pageTitle}</h1>

				{/* Step 1 */}
				{state.currentStep === 1 && (
					<div className="grid grid-cols-[1fr_1px_1fr] gap-12 items-start py-4">
						{/* Left Column */}
						<div className="flex flex-col gap-8">
							<FormField label="Tipo de patrimônio">
								<SearchableDropdown
									options={[...ASSET_TYPE_OPTIONS]}
									value={state.assetType}
									onChange={setAssetType}
									placeholder="Selecione ou busque o tipo"
								/>
							</FormField>

							<FormField label="Departamento">
								<SearchableDropdown
									disabled={!state.assetType}
									loading={state.loadingDepartments}
									options={filterDepartments()}
									value={state.department}
									onChange={setDepartment}
									placeholder={!state.assetType ? "Selecione o tipo primeiro" : "Selecione ou busque o departamento"}
									formatLabel={formatDepartmentLabel}
								/>
							</FormField>
						</div>

						<VerticalDivider />

						{/* Right Column */}
						<div className="flex flex-col gap-8">
							<FormField label="Marca">
								<Select disabled={!state.assetType} value={state.selectedBrand} onValueChange={setSelectedBrand}>
									<SelectTrigger className={`bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C] ${!state.assetType ? "opacity-50 cursor-not-allowed" : ""}`}>
										<SelectValue placeholder={!state.assetType ? "Selecione o tipo primeiro" : "Selecione a marca"} />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{filterBrands(data.brands).map((brand) => (
											<SelectItem key={brand.gid} value={brand.name} className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white">
												{brand.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormField>

							<FormField label="Modelo Completo">
								<Select disabled={!state.assetType} value={state.selectedModel} onValueChange={setSelectedModel}>
									<SelectTrigger className={`bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C] ${!state.assetType ? "opacity-50 cursor-not-allowed" : ""}`}>
										<SelectValue placeholder={!state.assetType ? "Selecione o tipo primeiro" : "Selecione o modelo"} />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{filterModels(data.models).map((model) => (
											<SelectItem key={model.gid} value={model.name} className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white">
												{model.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormField>

							<FormField label="Nº de Série">
								<Input
									type="text"
									placeholder="0000"
									value={state.serialNumber}
									onChange={(e) => handleSerialNumberChange(e.target.value)}
									className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full placeholder:text-[#A09E9C]"
								/>
							</FormField>

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
				{state.currentStep === 2 && (
					<div className="grid grid-cols-[1fr_1px_1fr] gap-12 items-start py-4">
						{/* Left Column */}
						<div className="flex flex-col gap-8">
							<div className="grid grid-cols-2 gap-4">
								<FormField label="Tamanho">
									<Select value={state.size} onValueChange={setSize}>
										<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
											<SelectValue placeholder="Selecione o tamanho" />
										</SelectTrigger>
										<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
											{data.sizes
												.filter((s) => s.name?.toLowerCase() !== "analisar")
												.map((sizeOption) => (
													<SelectItem key={sizeOption.gid} value={sizeOption.name} className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white">
														{sizeOption.name}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								</FormField>

								<FormField label="Status">
									<Select value={state.selectedStatus} onValueChange={setSelectedStatus}>
										<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
											<SelectValue placeholder="Selecione o status" />
										</SelectTrigger>
										<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
											{data.statuses.map((status) => (
												<SelectItem key={status.gid} value={status.name} className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white">
													{status.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormField>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<FormField label="Valor">
									<Input
										type="text"
										placeholder="R$10.000,00"
										value={state.value}
										onChange={(e) => handleValueChange(e.target.value)}
										className="bg-[#0C0907] border-[#332C24] text-[#8E8B87] p-3 rounded h-auto w-full placeholder:text-[#8E8B87]"
									/>
								</FormField>

								<FormField label="Data da compra">
									<Popover open={state.isCalendarOpen} onOpenChange={setIsCalendarOpen}>
										<PopoverTrigger asChild>
											<button
												type="button"
												className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full text-left cursor-pointer hover:bg-[#332C24]/30 transition-colors"
											>
												<span className="flex-1 text-sm">
													{state.purchaseDate
														? format(state.purchaseDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
														: "Selecione a data"}
												</span>
												<CalendarIcon size={18} className="text-[#A09E9C]" />
											</button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0 bg-[#1A1510] border-[#332C24]" align="start">
											<Calendar
												mode="single"
												selected={state.purchaseDate}
												onSelect={(date) => {
													setPurchaseDate(date)
													setIsCalendarOpen(false)
												}}
												locale={ptBR}
												className="rounded-md"
											/>
										</PopoverContent>
									</Popover>
								</FormField>
							</div>

							<FormField label="Fornecedor">
								<Select value={state.selectedSupplier} onValueChange={setSelectedSupplier}>
									<SelectTrigger className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full [&>svg]:text-[#A09E9C]">
										<SelectValue placeholder="Selecione o fornecedor" />
									</SelectTrigger>
									<SelectContent className="bg-[#1A1510] border-[#332C24] max-h-[300px]">
										{data.suppliers.map((supplier, index) => (
											<SelectItem key={`${supplier}-${index}`} value={supplier} className="text-[#A09E9C] focus:bg-[#332C24] focus:text-white">
												{supplier}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormField>
						</div>

						<VerticalDivider />

						{/* Right Column */}
						<div className="flex flex-col gap-6">
							<FormField label="Informações adicionais">
								<Textarea
									placeholder="Informações adicionais"
									value={state.additionalInfo}
									onChange={(e) => setAdditionalInfo(e.target.value)}
									className="bg-[#0C0907] border-[#332C24] text-[#8E8B87] p-3 rounded min-h-[100px] resize-y w-full placeholder:text-[#8E8B87]"
								/>
							</FormField>

							<div className="flex flex-col gap-2 mt-2">
								<span className="text-white font-medium text-sm">Vincular patrimônio à um colaborador</span>
								<EmployeeSearchDropdown
									employees={data.allEmployees}
									searchValue={state.employeeSearch}
									onSearchChange={setEmployeeSearch}
									selectedEmployee={state.selectedEmployee}
									onSelectEmployee={setSelectedEmployee}
									isOpen={state.isEmployeeDropdownOpen}
									onOpenChange={setIsEmployeeDropdownOpen}
								/>
							</div>

							<Button
								className="bg-default-orange hover:bg-default-orange/90 text-black font-bold h-[52px] w-full mt-2 gap-2 text-[15px] rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
								onClick={handleSubmit}
								disabled={state.isSubmitting}
							>
								{state.isSubmitting ? (
									<div className="flex items-center gap-2">
										<div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
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

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-white font-medium text-sm">{label}</span>
			{children}
		</div>
	)
}

function VerticalDivider() {
	return <div className="w-px h-full min-h-[350px] bg-[#332C24]" />
}
