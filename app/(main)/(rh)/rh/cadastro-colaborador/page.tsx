"use client"

import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import PersonalInformation from "./_forms/PersonalInformations"
import LaborDocuments from "./_forms/LaborDocuments"
import BankDetails from "./_forms/BankDetails"
import AdditionalDocuments from "./_forms/AdditionalDocuments"
import Finalization from "./_forms/Finalization"
import { useLogin } from "@/contexts/LoginContext"

const CadastroColaborador = () => {
	const { user } = useLogin()
	if (!user) redirect("/login")

	const path: { name: string; route: string }[] = [
		{ name: "Dashboard", route: "/rh" },
		{ name: "Cadastro de Colaborador", route: "/rh/cadastro-colaborador" }
	]

	const [actualStep, setActualStep] = useState<number>(1)
	const route = useRouter()

	return (
		<>
			{actualStep === 1 ? (
				<PersonalInformation
					urlPath={path}
					prevStep={() => route.push("/rh")}
					nextStep={() => setActualStep(2)}
					actualStep={actualStep}
					percentageProgress={20}
				/>
			) : actualStep === 2 ? (
				<LaborDocuments urlPath={path} prevStep={() => setActualStep(1)} actualStep={actualStep} percentageProgress={40} nextStep={() => setActualStep(3)} />
			) : actualStep === 3 ? (
				<BankDetails urlPath={path} prevStep={() => setActualStep(2)} actualStep={actualStep} percentageProgress={60} nextStep={() => setActualStep(4)} />
			) : actualStep === 4 ? (
				<AdditionalDocuments
					urlPath={path}
					prevStep={() => setActualStep(3)}
					actualStep={actualStep}
					percentageProgress={80}
					nextStep={() => setActualStep(5)}
				/>
			) : (
				actualStep === 5 && (
					<Finalization urlPath={path} prevStep={() => setActualStep(4)} actualStep={actualStep} percentageProgress={100} nextStep={() => route.push("/rh")} />
				)
			)}
		</>
	)
}

export default CadastroColaborador
