"use client"

import { useState } from "react"
import ProjectType from "./_forms/ProjectType"
import { useRouter } from "next/navigation"
import PaymentMethod from "./_forms/PaymentMethod"
import ClientData from "./_forms/ClientData"

const urlPath: { name: string; route: string }[] = [
	{ name: "Dashboard", route: "/comercial" },
	{ name: "Cadastro de Pré-Briefing", route: "/comercial/cadastro-pre-biefing" }
]

const PreBriefingRegistration = () => {
	const [actualStep, setActualStep] = useState<number>(1)
	const router = useRouter()

	return (
		<>
			{actualStep === 1 ? (
				<ProjectType
					urlPath={urlPath}
					prevStep={() => router.replace("/comercial")}
					actualStep={1}
					percentageProgress={0}
					nextStep={() => setActualStep(actualStep + 1)}
				/>
			) : actualStep === 2 ? (
				<PaymentMethod
					urlPath={urlPath}
					prevStep={() => router.replace("/comercial")}
					actualStep={1}
					percentageProgress={17}
					nextStep={() => setActualStep(3)}
				/>
			) : actualStep === 3 ? (
				<ClientData />
			) : (
				<></>
			)}
		</>
	)
}

export default PreBriefingRegistration
