"use client"

import Header from "@/components/Header"
import { LoginProvider } from "@/contexts/LoginContext"

const ClientShell = ({ session, children }: any) => (   // tirar any
    <main className="flex flex-col">
        <LoginProvider initialUser={session?.user || null}>
            <Header department="Recursos Humanos" />
            <div className="flex justify-center flex-1">
                <section className="flex flex-col justify-center w-303 gap-6">
                    { children }
                </section>
            </div>
        </LoginProvider>
    </main>
)

export default ClientShell