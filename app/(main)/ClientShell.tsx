"use client"

import Header from "@/components/Header"
import { CreateEmployeeProvider } from "@/contexts/rh/CreateEmployeeContext"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

const ClientShell = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()

    let departmentName = "Departamento"
    if (pathname.includes("/rh")) departmentName = "Recursos Humanos"
    if (pathname.includes("/ti")) departmentName = "Tecnologia da Informação"
    if (pathname.includes("/financeiro")) departmentName = "Financeiro"

    return (
        <main className="flex flex-col">        
            <CreateEmployeeProvider>
                <Header department={departmentName} />
                
                <div className="flex justify-center flex-1">
                    <section className="flex flex-col justify-center w-303 gap-6">
                        { children }
                    </section>
                </div>
            </CreateEmployeeProvider>
        </main>
    )
}

export default ClientShell