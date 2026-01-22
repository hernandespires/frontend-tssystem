import { MdDepartureBoard } from "react-icons/md"
import DataChart from "../DataChart"
import Button from "@/components/ui/button"


const DataMetrics = ({ department }: { department: string }) => {
    return (
        <section className="border border-default-border-color w-full rounded-md px-5 py-4 bg-black/20 flex flex-col justify-between h-full">
            <h1 className="section-title mb-4">Métricas do {department}</h1>
            <div className="flex-items-center-justify-center-flex-1">
                <div className="flex-1">
                    <Datachart title="" />
                </div>

                {/* linha fina */}
                <div className="h-40 w-px bg-default-border-color mx-2"></div>

                <div className="flex-1">
                    <DataChart title="" />
                </div>
            </div>
            
            <div>
                <Button
                    variant="outline"
                    className="w-full border-default-border-color/50 text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                        Ver todas as métricas
                </Button>
            </div>
        </section>
    )
}



export default DataMetrics