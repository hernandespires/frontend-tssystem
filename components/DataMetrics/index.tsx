import DataChart from "../DataChart"

const DataMetrics = ({ department }: { department: string }) => (
    <section className="border border-default-border-color w-full rounded-md px-5.5 py-4"><h1 className="section-title">Métricas do { department }</h1><DataChart /></section>
)
export default DataMetrics