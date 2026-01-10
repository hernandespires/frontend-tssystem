import Header from "@/components/Header"
import { LoginProvider } from "@/contexts/LoginContext"

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <main className="flex flex-col">
        <Header department="Recursos humanos" />
        <div className="flex justify-center flex-1">
            <section className="flex flex-col justify-center min-w-303 gap-6">
                <LoginProvider>
                    { children }
                </LoginProvider>
            </section>
        </div>
    </main>
)

export default RootLayout