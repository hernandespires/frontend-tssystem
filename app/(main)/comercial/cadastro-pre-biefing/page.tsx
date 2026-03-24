"use client"

import { useState } from "react"
import ProjectType from "./_forms/ProjectType"
import { useRouter } from "next/navigation"
import PaymentMethod from "./_forms/PaymentMethod"
import ClientData from "./_forms/ClientData"
import CompanyData from "./_forms/CompanyData"
import ScheduleDates from "./_forms/ScheduleDates"
import LeadInfo from "./_forms/LeadInfo"

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
					nextStep={() => setActualStep(actualStep + 1)}
					urlPath={urlPath}
					prevStep={() => router.replace("/comercial")}
					actualStep={actualStep}
					percentageProgress={0}
				/>
			) : actualStep === 2 ? (
				<PaymentMethod
					nextStep={() => setActualStep(actualStep + 1)}
					urlPath={urlPath}
					prevStep={() => setActualStep(actualStep - 1)}
					actualStep={actualStep}
					percentageProgress={17}
				/>
			) : actualStep === 3 ? (
				<ClientData
					nextStep={() => setActualStep(actualStep + 1)}
					urlPath={urlPath}
					prevStep={() => setActualStep(actualStep - 1)}
					actualStep={actualStep}
					percentageProgress={34}
				/>
			) : actualStep === 4 ? (
				<CompanyData
					urlPath={urlPath}
					prevStep={() => setActualStep(actualStep - 1)}
					nextStep={() => setActualStep(actualStep + 1)}
					actualStep={actualStep}
					percentageProgress={51}
				/>
			) : actualStep === 5 ? (
				<ScheduleDates
					urlPath={urlPath}
					prevStep={() => setActualStep(actualStep - 1)}
					nextStep={() => setActualStep(actualStep + 1)}
					actualStep={actualStep}
					percentageProgress={68}
				/>
			) : (
				actualStep == 6 && (
					<LeadInfo urlPath={urlPath} prevStep={() => setActualStep(actualStep - 1)} nextStep={() => {}} actualStep={actualStep} percentageProgress={100} />
				)
			)}
		</>
	)
}

export default PreBriefingRegistration
