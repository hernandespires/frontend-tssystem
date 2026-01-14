"use client"

import Header from "@/components/Header"
import { LoginProvider } from "@/contexts/LoginContext"
import { CreateEmployeeProvider } from "@/contexts/rh/CreateEmployeeContext"

const ClientShell = ({ session, children }: any) => (   // tirar any
    <main className="flex flex-col">
        <LoginProvider initialUser={session?.user || null}>
            <CreateEmployeeProvider>
                <Header department="Recursos Humanos" />
                <div className="flex justify-center flex-1">
                    <section className="flex flex-col justify-center w-303 gap-6">
                        { children }
                    </section>
                </div>
                </CreateEmployeeProvider>
        </LoginProvider>
    </main>
)

export default ClientShell