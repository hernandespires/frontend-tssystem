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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search, ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { IoIosArrowForward } from "react-icons/io"

// --- Mock Data ---

interface Card {
	id: string
	name: string
	bank: string
}

const MOCK_CARDS: Card[] = [
	{ id: "1", name: "Cartao 01", bank: "Nubank" },
	{ id: "2", name: "Cartao 02", bank: "Nubank" },
	{ id: "3", name: "Cartao 03", bank: "Nubank" },
	{ id: "4", name: "Cartao 04", bank: "Nubank" },
	{ id: "5", name: "Cartao 05", bank: "Nubank" },
	{ id: "6", name: "Cartao 06", bank: "Nubank" },
	{ id: "7", name: "Cartao 07", bank: "Nubank" },
	{ id: "8", name: "Cartao 08", bank: "Nubank" }
]

const ITEMS_PER_PAGE = 8
const TOTAL_PAGES = 5

// --- Page Component ---

const CardsPage = () => {
	const router = useRouter()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [searchQuery, setSearchQuery] = useState<string>("")

	const filteredCards = MOCK_CARDS.filter(
		(card) =>
			card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			card.bank.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handlePreviousPage = (): void => {
		if (currentPage > 1) setCurrentPage(currentPage - 1)
	}

	const handleNextPage = (): void => {
		if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1)
	}

	return (
		<>
			{/* Breadcrumb */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							href="/financeiro"
							className="text-gray-400 hover:text-white cursor-pointer"
						>
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-gray-500">/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-default-orange font-semibold">
							Cartões
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Main Container */}
			<section className="border border-default-border-color rounded-[8px] px-6 py-6">
				{/* Toolbar */}
				<div className="flex items-center justify-between mb-6">
					{/* Left Group */}
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => router.back()}
							className="flex items-center gap-2 rounded-[4px] border border-[#332C24] bg-transparent px-4 py-2 text-sm text-white transition-colors duration-200 hover:border-[#4A4035] cursor-pointer"
						>
							<ArrowLeft size={16} />
							Voltar
						</button>

						<InputGroup className="w-[300px]">
							<InputGroupInput
								placeholder="Buscar cartão..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<InputGroupAddon>
								<Search size={18} />
							</InputGroupAddon>
						</InputGroup>

						<button
							type="button"
							className="flex items-center rounded-[4px] border border-[#332C24] bg-transparent transition-colors duration-200 hover:border-[#4A4035] cursor-pointer"
						>
							<span className="px-4 py-2 text-sm font-medium text-default-orange">Filtrar</span>
							<span className="border-l border-[#332C24] px-3 py-2 text-[#8E8B87]">
								<ChevronDown size={16} />
							</span>
						</button>
					</div>

					{/* Right Group */}
					<button
						type="button"
						className="flex items-center gap-2 rounded-[4px] bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
					>
						<Plus size={16} />
						Cadastrar novo cartão
					</button>
				</div>

				{/* Card List */}
				<div className="flex flex-col">
					{filteredCards.map((card) => (
						<div
							key={card.id}
							className="flex items-center justify-between border-b border-[#332C24] py-4 transition-colors duration-200 hover:bg-[#1A1510] cursor-pointer"
						>
							<div className="flex flex-col gap-1">
								<span className="text-[15px] font-medium text-default-orange">{card.name}</span>
								<span className="text-[13px] text-[#8E8B87]">{card.bank}</span>
							</div>
							<IoIosArrowForward size={20} className="text-white" />
						</div>
					))}

					{filteredCards.length === 0 && (
						<div className="flex items-center justify-center py-16">
							<p className="text-[#8E8B87] text-sm">Nenhum cartão encontrado.</p>
						</div>
					)}
				</div>
			</section>

			{/* Pagination */}
			<div className="flex items-center justify-center gap-2">
				{Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
					<button
						key={page}
						type="button"
						onClick={() => setCurrentPage(page)}
						className={`flex h-8 w-8 items-center justify-center rounded-[4px] border text-sm transition-colors duration-200 cursor-pointer ${
							page === currentPage
								? "border-[#332C24] text-default-orange"
								: "border-[#332C24] text-white hover:border-[#4A4035]"
						}`}
					>
						{page}
					</button>
				))}
				<button
					type="button"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#332C24] text-white transition-colors duration-200 hover:border-[#4A4035] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
				>
					<ArrowLeft size={14} />
				</button>
				<button
					type="button"
					onClick={handleNextPage}
					disabled={currentPage === TOTAL_PAGES}
					className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#332C24] text-white transition-colors duration-200 hover:border-[#4A4035] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
				>
					<ArrowRight size={14} />
				</button>
			</div>
		</>
	)
}

export default CardsPage
