"use client"

import RoutesList from "@/components/RoutesList"
import Tabs from "@/components/Tabs"
import { useRef, useState } from "react"
import { SlSizeFullscreen } from "react-icons/sl"

const Metricas = () => {
	const tabs = ["Visão Geral", "Financeiro dos Recursos Humanos"]
	const [actualTab, setActualTab] = useState<string>(tabs[0])

	const wrapperRef = useRef<HTMLDivElement>(null)

	const path: { name: string; route: string }[] = [
		{ name: "Dashboard", route: "/rh" },
		{ name: "Métricas", route: "/rh/metricas" }
	]

	const handleFullscreen = () => {
		const el = wrapperRef.current

		if (!el) return
		if (el.requestFullscreen) el.requestFullscreen()
	}

	return (
		<main>
			<section className="flex justify-between items-center">
				<RoutesList>{path}</RoutesList>
				<button onClick={handleFullscreen} className="bg-transparent p-0 cursor-pointer">
					<SlSizeFullscreen color="#fda100" size={28} />
				</button>
			</section>
			<section className="flex mt-10">
				<Tabs actualTab={actualTab} setActualTab={setActualTab}>
					{tabs}
				</Tabs>
				<div ref={wrapperRef} className="w-full overflow-y-hidden iframe-wrapper">
					<iframe
						width="100%"
						height="535"
						src={
							actualTab === tabs[0]
								? "https://lookerstudio.google.com/embed/reporting/0bc3f97d-efc3-4500-bf5f-d4dd62c3cceb/page/ei0nF"
								: "https://lookerstudio.google.com/embed/reporting/80d6b137-ebb1-4912-93b6-ea6dc08206b7/page/Re8nF"
						}
						className="mb-[-19px]"
						allowFullScreen
						sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
					/>
				</div>
			</section>
		</main>
	)
}

export default Metricas
