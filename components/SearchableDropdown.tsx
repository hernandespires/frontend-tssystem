"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"

interface SearchableDropdownProps {
	options: string[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	loading?: boolean
	formatLabel?: (value: string) => string
}

export default function SearchableDropdown({
	options,
	value,
	onChange,
	placeholder = "Buscar...",
	disabled = false,
	loading = false,
	formatLabel = (v) => v,
}: SearchableDropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")

	// Sync local search term when value changes externally OR when dropdown is not open
	useEffect(() => {
		if (!isOpen) {
			setSearchTerm(formatLabel(value))
		}
	}, [value, isOpen, formatLabel])

	useClickOutside(dropdownRef, useCallback(() => {
		setIsOpen(false)
		// Revert to the current selected value's label when clicking outside
		setSearchTerm(formatLabel(value))
	}, [value, formatLabel]))

	const filteredOptions = options.filter((option) => {
		if (!searchTerm || (searchTerm === formatLabel(value) && !isOpen)) return true
		const term = searchTerm.toLowerCase()
		const formattedOption = formatLabel(option).toLowerCase()
		const rawOption = option.toLowerCase()
		return formattedOption.includes(term) || rawOption.includes(term)
	})

	const handleSelect = (option: string) => {
		onChange(option)
		setSearchTerm(formatLabel(option))
		setIsOpen(false)
	}

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<div
				className={`flex items-center bg-[#0C0907] border border-[#332C24] rounded px-4 py-3 transition-all duration-200 ${
					disabled ? "opacity-50 cursor-not-allowed" : "hover:border-default-orange/30 cursor-text"
				} ${isOpen ? "border-default-orange/50 ring-1 ring-default-orange/20" : ""}`}
				onClick={() => !disabled && setIsOpen(true)}
			>
				<Search size={18} className={`mr-3 shrink-0 transition-colors ${isOpen ? "text-default-orange" : "text-[#A09E9C]"}`} />
				<input
					type="text"
					placeholder={placeholder}
					className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-[#A09E9C] disabled:cursor-not-allowed"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value)
						if (!isOpen) setIsOpen(true)
					}}
					onFocus={() => !disabled && setIsOpen(true)}
					disabled={disabled}
				/>
				<ChevronDown
					size={18}
					className={`text-[#A09E9C] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-default-orange" : ""}`}
				/>
			</div>

			{isOpen && !disabled && (
				<div className="absolute top-full left-0 right-0 z-[100] mt-2 bg-[#1A1510] border border-[#332C24] rounded-md shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden scale-100 opacity-100 transition-all">
					{loading ? (
						<div className="p-4 flex items-center justify-center gap-3 text-[#A09E9C] text-sm italic">
							<div className="animate-spin rounded-full h-4 w-4 border-2 border-default-orange border-t-transparent" />
							Carregando...
						</div>
					) : filteredOptions.length > 0 ? (
						<div className="py-1">
							{filteredOptions.map((option, index) => (
								<button
									key={`${option}-${index}`}
									type="button"
									className={`w-full text-left p-3 transition-colors text-sm border-b border-[#332C24]/30 last:border-0 ${
										option === value 
											? "text-default-orange bg-default-orange/5 font-medium" 
											: "text-white hover:bg-[#332C24]"
									}`}
									onClick={() => handleSelect(option)}
								>
									{formatLabel(option)}
								</button>
							))}
						</div>
					) : (
						<div className="p-5 text-[#A09E9C] text-sm text-center italic flex flex-col gap-1">
							<span>Nenhum resultado encontrado</span>
							<span className="text-xs opacity-60">Tente buscar por outro termo</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
