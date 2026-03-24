"use client"

import { useRouter } from "next/navigation"
import { Search, ArrowDown, Rocket, ArrowLeft } from "lucide-react"
import { IoDocumentTextOutline } from "react-icons/io5"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CadastroPatrimonioPage() {
	const router = useRouter()

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
							<BreadcrumbPage className="text-sm text-default-orange">Cadastro de Acesso ao Sistema</BreadcrumbPage>
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
						onClick={() => router.back()}
					>
						<ArrowLeft size={16} />
						Voltar
					</Button>
					<h2 className="text-default-orange text-base font-bold">Cadastro de Acesso ao Sistema</h2>
				</div>

				{/* Header */}
				<h1 className="text-default-orange text-[22px] font-bold text-center mb-10">Cadastro de Acesso ao Sistema</h1>

				{/* Form Layout (Grid) */}
				<div className="grid grid-cols-[1fr_1px_1fr] gap-12 items-start">
					{/* Left Column */}
					<div className="flex flex-col gap-8">
						{/* Avatar Upload */}
						<div className="flex flex-col items-center gap-4">
							<div className="w-[120px] h-[120px] rounded-full border-2 border-dashed border-default-orange flex justify-center items-center bg-transparent">
								<IoDocumentTextOutline className="text-white text-5xl" />
							</div>
							<span className="text-white font-bold text-base">Avatar</span>
						</div>

						{/* Email Input */}
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-0.5">
								<span className="text-white font-medium text-sm">E-mail do Colaborador</span>
								<span className="text-[#A09E9C] text-[13px]">(Para acesso ao TS AGÊNCIA.)</span>
							</div>
							<Input type="password" placeholder="*********" className="bg-[#0C0907] border-[#332C24] text-white p-3 rounded h-auto w-full" />
						</div>

						{/* Password Input */}
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-0.5">
								<span className="text-white font-medium text-sm">Senha do Colaborador</span>
								<span className="text-[#A09E9C] text-[13px]">A senha precisa ter ao menos 8 caracteres.</span>
							</div>
							<Input type="password" placeholder="*********" className="bg-[#0C0907] border-[#332C24] text-white p-3 rounded h-auto w-full" />
						</div>
					</div>

					{/* Vertical Divider */}
					<div className="w-px h-full min-h-[400px] bg-[#332C24]"></div>

					{/* Right Column */}
					<div className="flex flex-col gap-6 pt-[146px]">
						<span className="text-white font-medium text-sm">Vincular conta à um colaborador cadastrado</span>

						{/* Search Input Group */}
						<div className="flex items-center bg-[#0C0907] border border-[#332C24] rounded px-4 py-3 gap-3">
							<Search className="text-white" size={18} />
							<input type="text" placeholder="Colaborador" className="flex-1 bg-transparent border-none text-white outline-none placeholder:text-[#A09E9C]" />
							<ArrowDown className="text-white" size={18} />
						</div>

						{/* Submit Button */}
						<Button className="bg-default-orange hover:bg-default-orange/90 text-black font-bold h-12 w-full mt-2 gap-2 text-[15px] rounded">
							<Rocket size={18} />
							Finalizar Cadastro
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
