"use client"

import { useState } from "react"
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

const CURRENT_STEP_COUNT = 2

export default function AssetRegistrationPage() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState(1)
	const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined)
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)

	const handleAdvance = () => {
		if (currentStep < CURRENT_STEP_COUNT) {
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
						className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 py-2 px-4 h-9 gap-2 font-normal rounded flex items-center"
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
								<div className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full relative">
									<span className="flex-1">Eletrônico</span>
									<ChevronDown size={18} />
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Categoria
								</span>
								<div className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full relative">
									<span className="flex-1">Notebook</span>
									<ChevronDown size={18} />
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Departamento
								</span>
								<div className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full relative">
									<span className="flex-1">Design</span>
									<ChevronDown size={18} />
								</div>
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
								<Input
									type="text"
									placeholder="Kingston"
									className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full placeholder:text-[#A09E9C]"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Modelo Completo
								</span>
								<Input
									type="text"
									placeholder="8GB Memória Kingston Ram DDR3"
									className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full placeholder:text-[#A09E9C]"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<span className="text-white font-medium text-sm">
									Nº de Série
								</span>
								<Input
									type="text"
									placeholder="000120202020"
									className="bg-[#0C0907] border-[#332C24] text-[#A09E9C] p-3 rounded h-auto w-full placeholder:text-[#A09E9C]"
								/>
							</div>

							<Button
								className="bg-default-orange hover:bg-default-orange/90 text-black font-bold h-14 w-full mt-2 gap-2 text-[15px] rounded"
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
									<div className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#8E8B87] p-3 rounded h-auto w-full relative">
										<span className="flex-1">8GB</span>
										<ChevronDown size={18} />
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<span className="text-white font-medium text-sm">
										Status
									</span>
									<div className="flex items-center bg-[#0C0907] border border-[#332C24] text-[#8E8B87] p-3 rounded h-auto w-full relative">
										<span className="flex-1">Ok</span>
										<ChevronDown size={18} />
									</div>
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
										placeholder="R$10.000"
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
												className="flex items-center bg-[#0C0907] border border-[#332C24] text-white p-3 rounded h-auto w-full text-left"
											>
												<span className="flex-1 text-sm">
													{purchaseDate
														? format(purchaseDate, "MMMM dd, yyyy")
														: "Selecione a data"}
												</span>
												<CalendarIcon size={18} className="text-[#8E8B87]" />
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
								<Input
									type="text"
									placeholder="Kabum"
									className="bg-[#0C0907] border-[#332C24] text-[#8E8B87] p-3 rounded h-auto w-full placeholder:text-[#8E8B87]"
								/>
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
									className="bg-[#0C0907] border-[#332C24] text-[#8E8B87] p-3 rounded min-h-[100px] resize-y w-full placeholder:text-[#8E8B87]"
								/>
							</div>

							{/* Vincular patrimônio */}
							<div className="flex flex-col gap-2 mt-2">
								<span className="text-white font-medium text-sm">
									Vincular patrimônio à um colaborador
								</span>

								{/* Search Input */}
								<div className="flex items-center bg-[#0C0907] border border-[#332C24] rounded px-4 py-3">
									<Search size={18} className="text-white mr-3" />
									<input
										type="text"
										placeholder="Buscar colaborador..."
										className="flex-1 bg-transparent border-none outline-none text-sm text-[#8E8B87] placeholder:text-[#8E8B87]"
									/>
									<ArrowDown size={18} className="text-white" />
								</div>

								{/* Selected Employee Card */}
								<div className="bg-[#0C0907] border border-[#332C24] rounded p-4 flex flex-col gap-2">
									<span className="text-white text-sm font-medium">
										Nome Colaborador
									</span>
									<span className="text-[#8E8B87] text-sm">
										colaborador@trajetoriadosucesso.com
									</span>
								</div>
							</div>

							{/* Finalizar Cadastro */}
							<Button
								className="bg-default-orange hover:bg-default-orange/90 text-black font-bold h-[52px] w-full mt-2 gap-2 text-[15px] rounded"
							>
								<Rocket size={18} />
								Finalizar Cadastro
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
