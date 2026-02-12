import Tabs from "@/components/Tabs"

const Metricas = () => (
    <>
        <Tabs>
            {["Métricas Gerais", "Financeiro Recursos Humanos"]}
        </Tabs>
        <main className="min-h-screen flex">
            <iframe className="w-full h-180 mt-15" src="https://lookerstudio.google.com/embed/reporting/37bbecab-2300-4ed7-b444-74f76bfde44f/page/qUCPF" />
        </main>
    </>
)

export default Metricas