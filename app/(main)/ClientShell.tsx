"use client"

import Header from "@/components/Header"
import { UploadProvider } from "@/contexts/files/UploadContext"
import { CreateEmployeeProvider } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { FindEmployeeProvider } from "@/contexts/rh/Employee/FindEmployeeContext"
import { ReactNode } from "react"

const ClientShell = ({ children }: { children: ReactNode }) => (
    <main className="flex flex-col">
        <CreateEmployeeProvider>
            <UploadProvider>
                <FindEmployeeProvider>
                    <Header department="Recursos Humanos" />
                    <div className="flex justify-center flex-1">
                        <section className="flex flex-col justify-center w-303 gap-6">
                            { children }
                        </section>
                    </div>
                </FindEmployeeProvider>
            </UploadProvider>
        </CreateEmployeeProvider>
    </main>
)

export default ClientShell