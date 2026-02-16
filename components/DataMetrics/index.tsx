import { FaChartPie } from "react-icons/fa"
import DataChart from "../DataChart"
import { useRouter } from "next/navigation"

const DataMetrics = ({ department, datas }: { department: string, datas: string[] }) => {
    const router = useRouter()

    return (
        <section className="border border-default-border-color w-full rounded-md py-3">
            {datas?.length > 0 ? (
                <>
                    <div className="flex justify-between px-5.5">
                        <h1 className="section-title">
                            Métricas dos { department }
                        </h1>
                        <button className="border border-orange-300 px-5.5 py-1.5 rounded cursor-pointer" onClick={() => router.push("/rh/metricas")}>
                            Todas as métricas
                        </button>
                    </div>
                    <DataChart datas={ datas } />
                </>
            ) : (
                <div className="flex justify-center items-center h-full flex-col gap-8">
                    <FaChartPie size={150} color="#ffffff2b" />
                    <h1 className="font-bold text-gray-300">
                        Adicione um novo funcionário para as obter as métricas
                    </h1>
                </div>
            )}
        </section>
    )
}

export default DataMetrics