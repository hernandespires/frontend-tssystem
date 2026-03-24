"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaArrowDown } from "react-icons/fa"
import { LogOut } from "lucide-react"
import Wellcome from "../Wellcome"
import { useLoginStore } from "@/store/auth/useLoginStore"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import { signOut } from "next-auth/react"

const Header = ({ department }: { department: string }) => {
	const user = useLoginStore((s) => s.user)
	const setUser = useLoginStore((s) => s.setUser)
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false)

	if (user === undefined) return null

	const handleLogout = (): void => {
		document.cookie = "auth_token=; path=/; max-age=0"
		setUser(null)
		signOut({ callbackUrl: "/login" })
	}

	return (
		<>
			<header className="m-4 glass-effect flex py-4.5 border border-default-border-color rounded-md justify-center">
				<section className="flex justify-between gap-130">
					<div className="flex gap-5">
						<Image
							src="/logo.svg"
							className="cursor-pointer"
							width="111"
							height="61"
							alt="Logo"
						/>
						<div className="flex-col text-xl">
							<Wellcome name={user?.name ?? ""} />
							<span className="font-bold text-white uppercase">{department}</span>
						</div>
					</div>
					<div className="flex gap-6">
						<Button
							size="icon-lg"
							variant="outline"
							className="w-16 h-15 cursor-pointer"
						>
							<Image
								src="/line-md_bell-filled.svg"
								width="32"
								height="32"
								alt="Notificações"
							/>
						</Button>
						<Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
							<PopoverTrigger asChild>
								<Button className="min-w-45 h-15 border border-default-orange bg-transparent gap-2 cursor-pointer">
									<Avatar className="w-12 h-12">
										<AvatarImage src={user?.image} alt="Avatar" />
										<AvatarFallback>TS</AvatarFallback>
									</Avatar>
									<p className="font-bold text-default-orange text-xl">Perfil</p>
									<FaArrowDown color="#ffa300" width="20" />
								</Button>
							</PopoverTrigger>
							<PopoverContent align="end" sideOffset={8} className="w-48 p-1">
								<button
									type="button"
									onClick={() => {
										setIsDropdownOpen(false)
										setIsLogoutModalOpen(true)
									}}
									className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm font-medium text-[#D32F2F] transition-colors duration-200 hover:bg-red-50 cursor-pointer"
								>
									<LogOut size={18} />
									Sair
								</button>
							</PopoverContent>
						</Popover>
					</div>
				</section>
			</header>

			{isLogoutModalOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					onClick={() => setIsLogoutModalOpen(false)}
					role="dialog"
					aria-modal="true"
					aria-label="Confirmação de logout"
				>
					<div
						className="flex w-[400px] flex-col items-center rounded-[8px] border border-[#4A4A4A] bg-black/50 px-8 pt-10 pb-8 text-center shadow-[0px_15px_35px_-5px_rgba(0,0,0,0.5),0px_0px_10px_2px_rgba(0,0,0,0.2)]"
						onClick={(e) => e.stopPropagation()}
					>
						<LogOut size={48} className="mb-4 text-white" aria-hidden="true" />
						<h2 className="mb-4 text-lg font-bold text-white" aria-hidden="true">
							Você realmente deseja sair?
						</h2>
						<p className="text-base font-medium text-[#A3A3A3]">
							Todo o progresso sera perdido.
						</p>
						<div className="mt-6 flex gap-4">
							<button
								type="button"
								onClick={handleLogout}
								className="min-w-[120px] rounded-[6px] bg-[#D32F2F] px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#EF5350] cursor-pointer"
							>
								Sair
							</button>
							<button
								type="button"
								onClick={() => setIsLogoutModalOpen(false)}
								className="min-w-[120px] rounded-[6px] bg-[#FFA000] px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#FF8F00] cursor-pointer"
							>
								Continuar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Header
