"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, CalendarIcon, Landmark, Wifi, Rocket } from "lucide-react"
import { formatterCurrencyBRL } from "@/utils/formatters"
import { toast } from "sonner"

// --- Card Number Formatter ---

const formatCardNumber = (value: string): string => {
	const digits = value.replace(/\D/g, "").slice(0, 16)
	return digits.replace(/(.{4})/g, "$1 ").trim()
}

// --- Month/Year Options ---

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
	const month = String(i + 1).padStart(2, "0")
	return { label: month, value: month }
})

const CURRENT_YEAR = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: 15 }, (_, i) => {
	const year = String(CURRENT_YEAR + i)
	return { label: year, value: year }
})

// --- Page Component ---

const RegisterCardPage = () => {
	const router = useRouter()

	// Card preview state
	const [cardNumber, setCardNumber] = useState<string>("")
	const [cardMonth, setCardMonth] = useState<string>("")
	const [cardYear, setCardYear] = useState<string>("")
	const [cvv, setCvv] = useState<string>("")
	const [cardholderName, setCardholderName] = useState<string>("")
	const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false)

	// Form state
	const [cardOwner, setCardOwner] = useState<string>("")
	const [costCenter, setCostCenter] = useState<string>("")
	const [cardType, setCardType] = useState<string>("")
	const [cardLimit, setCardLimit] = useState<string>("")
	const [bestPurchaseDate, setBestPurchaseDate] = useState<Date | undefined>(undefined)
	const [invoiceClosingDate, setInvoiceClosingDate] = useState<Date | undefined>(undefined)
	const [invoiceDueDate, setInvoiceDueDate] = useState<Date | undefined>(undefined)
	const [notes, setNotes] = useState<string>("")

	// Popover open state for date pickers
	const [bestPurchaseDateOpen, setBestPurchaseDateOpen] = useState<boolean>(false)
	const [invoiceClosingDateOpen, setInvoiceClosingDateOpen] = useState<boolean>(false)
	const [invoiceDueDateOpen, setInvoiceDueDateOpen] = useState<boolean>(false)

	const displayCardNumber = cardNumber || "0000 0000 0000 0000"
	const displayMonth = cardMonth || "00"
	const displayYear = cardYear ? cardYear.slice(-2) : "00"
	const displayName = cardholderName || "Fulano da Silva"
	const displayCvv = cvv || "•••"

	const handleSubmit = (): void => {
		toast.success("Cartão cadastrado com sucesso!")
		router.push("/financeiro/cartoes")
	}

	return (
		<>
			{/* Breadcrumb */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/financeiro" className="text-gray-400 hover:text-white cursor-pointer">
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-gray-500">/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/financeiro/cartoes" className="text-gray-400 hover:text-white cursor-pointer">
							Cartões
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-gray-500">/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-default-orange font-semibold">
							Cadastrar cartão
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Main Container */}
			<section className="border border-[#332C24] rounded-[8px] px-8 py-8">
				{/* Top Bar */}
				<div className="flex items-center gap-6 mb-8">
					<button
						type="button"
						onClick={() => router.back()}
						className="flex items-center gap-2 rounded-[4px] border border-[#332C24] bg-transparent px-4 py-2 text-sm text-white transition-colors duration-200 hover:border-[#4A4035] cursor-pointer"
					>
						<ArrowLeft size={16} />
						Voltar
					</button>
					<h1 className="text-lg font-bold text-default-orange">Cadastrar cartão</h1>
				</div>

				{/* Form Layout: Two Columns with Divider */}
				<div className="flex gap-8">
					{/* Left Column */}
					<div className="flex flex-1 flex-col gap-6">
						{/* Card Preview with Flip */}
						<div className="perspective-[1000px] w-full">
							<div
								className={`relative w-full aspect-[1.586/1] transition-transform duration-600 [transform-style:preserve-3d] ${isCardFlipped ? "[transform:rotateY(180deg)]" : ""}`}
							>
								{/* Card Front */}
								<div className="absolute inset-0 flex flex-col justify-between rounded-[16px] p-6 text-white [backface-visibility:hidden] bg-gradient-to-br from-[#2A1C00] to-[#FFB300] shadow-[0_10px_25px_-5px_rgba(255,179,0,0.15)]">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Landmark size={20} />
											<span className="text-base font-bold">CARTÃO</span>
										</div>
										<span className="text-sm font-bold">CREDIT</span>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-lg font-bold tracking-[2px]">{displayCardNumber}</span>
										<Wifi size={24} />
									</div>

									<div className="flex items-center gap-8">
										<div className="flex items-center gap-2">
											<span className="text-[8px] leading-tight opacity-70">VALID{"\n"}THRU</span>
											<span className="text-sm font-bold">{displayMonth}/{displayYear}</span>
										</div>
									</div>

									<span className="text-base font-bold">{displayName}</span>
								</div>

								{/* Card Back */}
								<div className="absolute inset-0 flex flex-col rounded-[16px] text-white [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#FFB300] to-[#2A1C00] shadow-[0_10px_25px_-5px_rgba(255,179,0,0.15)]">
									{/* Magnetic Stripe */}
									<div className="mt-8 h-12 w-full bg-[#1A1510]" />

									{/* CVV Strip */}
									<div className="mx-6 mt-6 flex items-center justify-end">
										<div className="flex h-10 w-full items-center justify-end rounded-[4px] bg-white/20 px-4">
											<span className="text-lg font-bold tracking-[4px]">{displayCvv}</span>
										</div>
									</div>

									{/* Bottom Info */}
									<div className="mt-auto px-6 pb-6">
										<span className="text-xs opacity-70">{displayName}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Posse do cartão */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Posse do cartão*</FieldLabel>
							<Input
								value={cardOwner}
								onChange={(e) => setCardOwner(e.target.value)}
								placeholder="Fulano da Silva"
								className="bg-[#0C0907] border-[#332C24]"
							/>
						</Field>

						{/* Titular do cartão */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Titular do cartão*</FieldLabel>
							<Input
								value={cardholderName}
								onChange={(e) => setCardholderName(e.target.value)}
								placeholder="Fulano da Silva"
								onFocus={() => setIsCardFlipped(false)}
							className="bg-[#0C0907] border-[#332C24]"
							/>
						</Field>

						{/* Centro de custo */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Centro de custo*</FieldLabel>
							<Select value={costCenter} onValueChange={setCostCenter}>
								<SelectTrigger className="bg-[#0C0907] border-[#332C24]">
									<SelectValue placeholder="TS Agência" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ts_agencia">TS Agência</SelectItem>
									<SelectItem value="ts_system">TS System</SelectItem>
								</SelectContent>
							</Select>
						</Field>

						{/* Tipo de cartão */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Tipo de cartão*</FieldLabel>
							<Select value={cardType} onValueChange={setCardType}>
								<SelectTrigger className="bg-[#0C0907] border-[#332C24]">
									<SelectValue placeholder="Fisico" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="physical">Fisico</SelectItem>
									<SelectItem value="virtual">Virtual</SelectItem>
								</SelectContent>
							</Select>
						</Field>
					</div>

					{/* Divider */}
					<div className="w-px bg-[#332C24]" />

					{/* Right Column */}
					<div className="flex flex-1 flex-col gap-5">
						{/* Número do cartão */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Número do cartão*</FieldLabel>
							<Input
								value={cardNumber}
								onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
								onFocus={() => setIsCardFlipped(false)}
								placeholder="0000 0000 0000 0000"
								maxLength={19}
								className="bg-[#0C0907] border-[#332C24]"
							/>
						</Field>

						{/* Mês, Ano, CVV */}
						<div className="grid grid-cols-3 gap-4">
							<Field>
								<FieldLabel className="text-default-orange text-sm font-medium">Mês*</FieldLabel>
								<Select value={cardMonth} onValueChange={(value) => { setCardMonth(value); setIsCardFlipped(false) }}>
									<SelectTrigger className="bg-[#0C0907] border-[#332C24]" onFocus={() => setIsCardFlipped(false)}>
										<SelectValue placeholder="00" />
									</SelectTrigger>
									<SelectContent>
										{MONTH_OPTIONS.map((opt) => (
											<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
							<Field>
								<FieldLabel className="text-default-orange text-sm font-medium">Ano*</FieldLabel>
								<Select value={cardYear} onValueChange={(value) => { setCardYear(value); setIsCardFlipped(false) }}>
									<SelectTrigger className="bg-[#0C0907] border-[#332C24]" onFocus={() => setIsCardFlipped(false)}>
										<SelectValue placeholder="0000" />
									</SelectTrigger>
									<SelectContent>
										{YEAR_OPTIONS.map((opt) => (
											<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
							<Field>
								<FieldLabel className="text-default-orange text-sm font-medium">CVV*</FieldLabel>
								<Input
									value={cvv}
									onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
									onFocus={() => setIsCardFlipped(true)}
									onBlur={() => setIsCardFlipped(false)}
									placeholder="123"
									maxLength={3}
									inputMode="numeric"
									className="bg-[#0C0907] border-[#332C24]"
								/>
							</Field>
						</div>

						{/* Limite do cartão */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Limite do cartão*</FieldLabel>
							<Input
								value={cardLimit}
								onChange={(e) => setCardLimit(formatterCurrencyBRL(e.target.value))}
								placeholder="R$00000,00"
								className="bg-[#0C0907] border-[#332C24]"
							/>
						</Field>

						{/* Melhor dia para compra + Fechamento de fatura */}
						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel className="text-default-orange text-sm font-medium">Melhor dia para compra*</FieldLabel>
								<Popover open={bestPurchaseDateOpen} onOpenChange={setBestPurchaseDateOpen}>
									<PopoverTrigger asChild>
										<button
											type="button"
											className="flex h-9 w-full items-center justify-between rounded-md border border-[#332C24] bg-[#0C0907] px-3 text-sm text-white cursor-pointer"
										>
											<span className={bestPurchaseDate ? "text-white" : "text-[#8E8B87]"}>
												{bestPurchaseDate ? bestPurchaseDate.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) : "Selecionar data"}
											</span>
											<CalendarIcon size={16} className="text-[#8E8B87]" />
										</button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={bestPurchaseDate}
											onSelect={(date) => { setBestPurchaseDate(date); setBestPurchaseDateOpen(false) }}
										/>
									</PopoverContent>
								</Popover>
							</Field>
							<Field>
								<FieldLabel className="text-default-orange text-sm font-medium">Fechamento de fatura*</FieldLabel>
								<Popover open={invoiceClosingDateOpen} onOpenChange={setInvoiceClosingDateOpen}>
									<PopoverTrigger asChild>
										<button
											type="button"
											className="flex h-9 w-full items-center justify-between rounded-md border border-[#332C24] bg-[#0C0907] px-3 text-sm text-white cursor-pointer"
										>
											<span className={invoiceClosingDate ? "text-white" : "text-[#8E8B87]"}>
												{invoiceClosingDate ? invoiceClosingDate.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) : "Selecionar data"}
											</span>
											<CalendarIcon size={16} className="text-[#8E8B87]" />
										</button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={invoiceClosingDate}
											onSelect={(date) => { setInvoiceClosingDate(date); setInvoiceClosingDateOpen(false) }}
										/>
									</PopoverContent>
								</Popover>
							</Field>
						</div>

						{/* Vencimento da fatura */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Vencimento da fatura*</FieldLabel>
							<Popover open={invoiceDueDateOpen} onOpenChange={setInvoiceDueDateOpen}>
								<PopoverTrigger asChild>
									<button
										type="button"
										className="flex h-9 w-full items-center justify-between rounded-md border border-[#332C24] bg-[#0C0907] px-3 text-sm text-white cursor-pointer"
									>
										<span className={invoiceDueDate ? "text-white" : "text-[#8E8B87]"}>
											{invoiceDueDate ? invoiceDueDate.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) : "Selecionar data"}
										</span>
										<CalendarIcon size={16} className="text-[#8E8B87]" />
									</button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={invoiceDueDate}
										onSelect={(date) => { setInvoiceDueDate(date); setInvoiceDueDateOpen(false) }}
									/>
								</PopoverContent>
							</Popover>
						</Field>

						{/* Notas */}
						<Field>
							<FieldLabel className="text-default-orange text-sm font-medium">Notas</FieldLabel>
							<Textarea
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								placeholder="Comentários adicionais..."
								className="min-h-[100px] resize-y bg-[#0C0907] border-[#332C24]"
							/>
						</Field>

						{/* Submit Button */}
						<button
							type="button"
							onClick={handleSubmit}
							className="mt-2 flex w-full items-center justify-center gap-2 rounded-[4px] bg-default-orange py-3 text-sm font-bold text-black transition-colors duration-200 hover:bg-[#FF8F00] cursor-pointer"
						>
							<Rocket size={16} />
							Finalizar cadastro
						</button>
					</div>
				</div>
			</section>
		</>
	)
}

export default RegisterCardPage
