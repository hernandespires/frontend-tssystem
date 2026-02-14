"use client"

import Tabs from "@/components/Tabs"
import { useState } from "react"
import { FaAddressCard } from "react-icons/fa"

const Metricas = () => {
    const tabs = ["Visão Geral", "Financeiro dos Recursos Humanos"]
    const [actualTab, setActualTab] = useState<string>(tabs[0])

    return (
        <main className="flex mt-14">
            <Tabs actualTab={actualTab} setActualTab={setActualTab}>
                {tabs}
            </Tabs>
            <div className="w-full">
                {
                    actualTab === tabs[0] ? 
                    <iframe 
                        width="100%" 
                        height="535" 
                        src="https://lookerstudio.google.com/embed/reporting/0bc3f97d-efc3-4500-bf5f-d4dd62c3cceb/page/ei0nF"
                        allowFullScreen 
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    /> :
                    <iframe 
                        width="100%" 
                        height="535" 
                        src="https://lookerstudio.google.com/embed/reporting/80d6b137-ebb1-4912-93b6-ea6dc08206b7/page/Re8nF" 
                        allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" 
                    />
                }
                <FaAddressCard className="mat-mdc-tooltip-trigger fullscreen-icon" />
            </div>
        </main>
    )
}

export default Metricas