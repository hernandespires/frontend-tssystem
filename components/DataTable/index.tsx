"use client"

import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import DataTableList from "./DataTableList"
import { Button } from "../ui/button"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import { findAllEmployees } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { useEffect, useState, useMemo } from "react"

const DataTable = ({ filter }: { filter: string }) => {
	const [allEmployees, setAllEmployees] = useState<Employee[] | null>(null)
	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		const fetchAllEmployees = async () => {
			try {
				const data: Employee[] = await findAllEmployees()
				setAllEmployees(data)
			} catch (error) {
				console.error("Erro ao buscar funcionários:", error)
			}
		}

		fetchAllEmployees()
	}, [])

	const filteredEmployees = useMemo(() => {
		if (!allEmployees) return []
		if (!searchTerm) return allEmployees

		const lowerTerm = searchTerm.toLowerCase()

		return allEmployees.filter((employee) => {
			const nameMatch = employee.name?.toLowerCase().includes(lowerTerm)
			const roleMatch = employee.role?.toLowerCase().includes(lowerTerm)

			return nameMatch || roleMatch
		})
	}, [allEmployees, searchTerm])

	return (
		<section className="flex flex-col gap-1.5 border border-default-border-color px-5.5 py-2.5 rounded-md h-full max-h-102.5 w-147">
			<h1 className="section-title">Lista de {filter}</h1>
			<InputGroup>
				<InputGroupInput
					placeholder={`Buscar em ${filter}...`}
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
				<InputGroupAddon>
					<Search />
				</InputGroupAddon>
			</InputGroup>
			<div className="overflow-y-auto">
				<DataTableList data={filteredEmployees} />
			</div>
			{allEmployees && allEmployees.length > 0 && (
				<div className="mt-auto flex justify-end">
					<Button variant="outline" size="sm" className="p-4.5 cursor-pointer">
						<RiGitRepositoryCommitsFill />
						Ver todos {filter}
					</Button>
				</div>
			)}
		</section>
	)
}

export default DataTable
