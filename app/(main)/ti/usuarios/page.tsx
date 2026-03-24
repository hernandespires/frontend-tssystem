"use client"

import { useRouter } from "next/navigation"
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

// --- Constants ---
const MOCK_USERS = Array.from({ length: 7 }).map((_, i) => ({
	id: String(i + 1),
	name: "Colaborador",
	email: "colaborador@trajetoriadosucesso.com",
}))

export default function UsuariosPage() {
	const router = useRouter()

	return (
		<div className="flex flex-col w-full gap-6 pb-10">
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
								Lista de usuários
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
						className="bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 py-2 px-4 h-10 gap-2 font-normal rounded flex items-center"
						onClick={() => router.back()}
					>
						<ArrowLeft size={16} />
						Voltar
					</Button>

					<InputGroup className="flex w-[350px] bg-[#14100C] border-[#332C24] h-10 rounded">
						<InputGroupInput 
							placeholder="Buscar colaborador..." 
							className="text-white text-sm bg-transparent !border-0"
						/>
						<InputGroupAddon className="bg-transparent border-l-0 text-[#A09E9C] !p-2 !border-0 flex items-center justify-center">
							<Search size={16} />
						</InputGroupAddon>
					</InputGroup>

					<Button
						variant="outline"
						className="bg-transparent border-[#332C24] p-0 h-10 rounded font-normal text-white hover:bg-[#332C24]/50 flex items-center"
					>
						<span className="px-4 py-2 text-sm">Selecionar Filtro</span>
						<div className="w-[1px] h-full bg-[#332C24]"></div>
						<div className="px-3 py-2 text-[#A09E9C]">
							<ChevronDown size={16} />
						</div>
					</Button>
				</div>

				{/* User List */}
				<div className="flex flex-col w-full">
					{MOCK_USERS.map((user, index) => (
						<div
							key={user.id}
							className={`
								flex justify-between items-center py-4 cursor-pointer hover:bg-[#1A1510]/50 transition-colors
								${index < MOCK_USERS.length - 1 ? "border-b border-[#332C24]" : ""}
							`}
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
				</div>

				{/* Pagination */}
				<div className="flex justify-center gap-2 mt-8">
					<Button
						variant="outline"
						className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-default-orange hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						1
					</Button>
					<Button
						variant="outline"
						className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						2
					</Button>
					<Button
						variant="outline"
						className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						3
					</Button>
					<Button
						variant="outline"
						className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						4
					</Button>
					<Button
						variant="outline"
						className="w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						5
					</Button>

					<Button
						variant="outline"
						className="max-w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						<ArrowLeft size={16} />
					</Button>
					<Button
						variant="outline"
						className="max-w-8 h-8 p-0 bg-transparent border-[#332C24] text-white hover:bg-[#332C24]/50 rounded flex items-center justify-center font-normal text-sm"
					>
						<ArrowRight size={16} />
					</Button>
				</div>
			</div>
		</div>
	)
}
