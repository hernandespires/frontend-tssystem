import { FaChartPie } from "react-icons/fa"
import DataChart from "../DataChart"

const DataMetrics = ({ department, datas }: { department: string, datas: string[] }) => (
    <section className="border border-default-border-color w-full rounded-md py-4">
        {datas?.length > 0 ? (
            <><h1 className="section-title px-5.5">Métricas dos { department }</h1><DataChart datas={ datas } /></>
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

export default DataMetrics