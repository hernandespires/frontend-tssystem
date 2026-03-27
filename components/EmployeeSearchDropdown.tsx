"use client"

import { useRef, useCallback } from "react"
import { Search, ArrowDown } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { Employee } from "@/types/services/humanResources/employee"

interface EmployeeSearchDropdownProps {
	employees: Employee[]
	searchValue: string
	onSearchChange: (value: string) => void
	selectedEmployee: Employee | null
	onSelectEmployee: (employee: Employee) => void
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	placeholder?: string
}

export default function EmployeeSearchDropdown({
	employees,
	searchValue,
	onSearchChange,
	selectedEmployee,
	onSelectEmployee,
	isOpen,
	onOpenChange,
	placeholder = "Buscar colaborador...",
}: EmployeeSearchDropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null)

	useClickOutside(dropdownRef, useCallback(() => onOpenChange(false), [onOpenChange]))

	const filteredEmployees = employees.filter((emp) => {
		if (!searchValue) return true
		const term = searchValue.toLowerCase()
		return emp.name.toLowerCase().includes(term) || emp.email.toLowerCase().includes(term)
	})

	const handleSelect = (employee: Employee) => {
		onSelectEmployee(employee)
		onSearchChange(employee.name)
		onOpenChange(false)
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="relative" ref={dropdownRef}>
				<div className="flex items-center bg-[#0C0907] border border-[#332C24] rounded px-4 py-3">
					<Search size={18} className="text-white mr-3" />
					<input
						type="text"
						placeholder={placeholder}
						className="flex-1 bg-transparent border-none outline-none text-sm text-[#8E8B87] placeholder:text-[#8E8B87]"
						value={searchValue}
						onChange={(e) => {
							onSearchChange(e.target.value)
							onOpenChange(true)
						}}
						onFocus={() => onOpenChange(true)}
					/>
					<ArrowDown size={18} className="text-white" />
				</div>

				{isOpen && (
					<div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#1A1510] border border-[#332C24] rounded shadow-lg max-h-48 overflow-y-auto">
						{filteredEmployees.length > 0 ? (
							filteredEmployees.map((emp) => (
								<div
									key={emp.id}
									className="p-3 hover:bg-[#332C24] cursor-pointer text-sm text-white border-b border-[#332C24] last:border-0"
									onClick={() => handleSelect(emp)}
								>
									<div className="font-medium text-default-orange">{emp.name}</div>
									<div className="text-[#A09E9C] text-xs">{emp.email}</div>
								</div>
							))
						) : (
							<div className="p-3 text-[#A09E9C] text-sm text-center">
								Nenhum colaborador encontrado
							</div>
						)}
					</div>
				)}
			</div>

			{selectedEmployee && (
				<div className="bg-[#0C0907] border border-[#332C24] rounded p-4 flex flex-col gap-2">
					<span className="text-white text-sm font-medium">{selectedEmployee.name}</span>
					<span className="text-[#8E8B87] text-sm">{selectedEmployee.email}</span>
				</div>
			)}
		</div>
	)
}
