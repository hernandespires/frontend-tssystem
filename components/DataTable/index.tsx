"use client"

import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import DataTableList from "./DataTableList"
import { Button } from "../ui/button"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import { findAllEmployees } from "@/services/humanResources/employee"
import { Employee } from "@/types/services/humanResources/employee"
import { useEffect, useState } from "react"

const DataTable = ({ filter }: { filter: string }) => {
    const [allEmployees, setAllEmployees] = useState<Employee[] | null>(null)

    useEffect(() => {
        const fetchAllEmployees = async () => {
            const data: Employee[] = await findAllEmployees()
            return setAllEmployees(data)
        }

        fetchAllEmployees()
    }, [])

    return (
        <section className="w-1/2 max-w-147">
            <section className="flex flex-col gap-1.5 border-1 border-default-border-color px-5.5 py-2.5 rounded-md h-full max-h-102.5 overflow-y-auto">
                <h1 className="section-title">
                    Lista de { filter }
                </h1>
                <InputGroup>
                    <InputGroupInput placeholder={ filter } />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>                
                <DataTableList data={allEmployees} />
                <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="p-4.5">
                        <RiGitRepositoryCommitsFill />
                        Ver todos { filter }
                    </Button>
                </div>
            </section>
        </section>
    )
}

export default DataTable