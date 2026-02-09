import DataChart from "../DataChart"

const DataMetrics = ({ department, datas }: { department: string, datas: string[] }) => (
    <section className="border border-default-border-color w-full rounded-md px-5.5 py-4"><h1 className="section-title">Métricas dos { department }</h1><DataChart datas={ datas } /></section>
)

export default DataMetrics