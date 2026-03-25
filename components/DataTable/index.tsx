"use client"

import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import DataTableList from "./DataTableList"
import { Button } from "../ui/button"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import { Employee } from "@/types/services/humanResources/employee"
import { useMemo, useState } from "react"

import { useRouter } from "next/navigation"

const DataTable = ({
	filter,
	data,
	className = "w-147 max-h-102.5 min-h-full",
	setContextInfo,
	path,
	viewAllPath
}: {
	filter: string
	data: Employee[]
	className?: string
	setContextInfo: any
	path: string
	viewAllPath?: string
}) => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState("")

	const filteredEmployees = useMemo(() => {
		if (!data) return []
		if (!searchTerm) return data

		const lowerTerm = searchTerm.toLowerCase()

		return data.filter((employee) => {
			const nameMatch = employee.name?.toLowerCase().includes(lowerTerm)
			const departmentMatch = employee.department?.toLowerCase().includes(lowerTerm)

			return nameMatch || departmentMatch
		})
	}, [data, searchTerm])

	return (
		<section className={`flex flex-col gap-1.5 border border-default-border-color px-5.5 py-2.5 rounded-md ${className}`}>
			<h1 className="section-title">{filter}</h1>
			<InputGroup>
				<InputGroupInput placeholder={`Buscar em ${filter}...`} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
				<InputGroupAddon>
					<Search />
				</InputGroupAddon>
			</InputGroup>
			<div className="overflow-y-auto">
				<DataTableList data={filteredEmployees} setContextInfo={setContextInfo} path={path} />
			</div>
			{data && data.length > 0 && viewAllPath && (
				<div className="mt-auto flex justify-end">
					<Button 
						variant="outline" 
						size="sm" 
						className="p-4.5 cursor-pointer"
						onClick={() => router.push(viewAllPath)}
					>
						<RiGitRepositoryCommitsFill />
						Ver todos {filter}
					</Button>
				</div>
			)}
		</section>
	)
}

export default DataTable
