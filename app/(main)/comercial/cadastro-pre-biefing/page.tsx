"use client"

import { useState } from "react"
import ProjectType from "./_forms/ProjectType"
import { useRouter } from "next/navigation"

const urlPath: { name: string; route: string }[] = [
	{ name: "Dashboard", route: "/comercial" },
	{ name: "Cadastro de Pré-Briefing", route: "/comercial/cadastro-pre-biefing" }
]

const PreBriefingRegistration = () => {
	const [actualRoute, setActualStep] = useState<number>(1)
	const router = useRouter()

	return (
		<>
			{/* fazer um setActualStep(actualStep++) */}
			<ProjectType urlPath={urlPath} prevStep={() => router.replace("/comercial")} actualStep={1} percentageProgress={0} nextStep={() => setActualStep(2)} />
		</>
	)
}

export default PreBriefingRegistration
