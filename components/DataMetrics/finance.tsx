"use client"

import { Button } from "@/components/ui/button"
import FinanceChart from "@/components/DataChart/finance"

const DataMetricsFinance = () => {
    return (
        <section className="border border-default-border-color w-full rounded-md px-5 py-4 bg-black/20 flex flex-col justify-between h-full min-h-100">
            
            <h1 className="section-title mb-6 text-center text-default-orange">
                Métricas do Financeiro
            </h1>
            
            <div className="flex-1 w-full flex items-end">
                <FinanceChart />
            </div>

        <Button
            variant="outline"
            className="w-full border-default-border-color/50 text-gray-300 hover:bg-white/5 hover:text-white">
                Ver todas as métricas
        </Button>
        </section>
    )
}

export default DataMetricsFinance