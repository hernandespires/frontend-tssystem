"use client"

import AdditionalDocuments from "@/components/EmployeeRegistrationForm/AdditionalDocuments"
import BankDetails from "@/components/EmployeeRegistrationForm/BankDetails"
import Finalization from "@/components/EmployeeRegistrationForm/Finalization"
import LaborDocuments from "@/components/EmployeeRegistrationForm/LaborDocuments"
import PersonalInformation from "@/components/EmployeeRegistrationForm/PersonalInformations"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CadastroColaborador = () => {
    const path: { name: string; route: string; }[] = [{ name: "Dashboard", route: "/rh" }, { name: "Cadastro de Colaborador", route: "/rh/cadastro-colaborador" }]
    
    const [actualStep, setActualStep] = useState<number>(1)
    const route = useRouter()

    return (
        <>
            {
                actualStep === 1 ? <PersonalInformation urlPath={path} prevStep={() => route.push("/rh")} actualStep={actualStep} percentageProgress={20} nextStep={() => setActualStep(2)} />
                : actualStep === 2 ? <LaborDocuments urlPath={path} prevStep={() => setActualStep(1)} actualStep={actualStep} percentageProgress={40} nextStep={() => setActualStep(3)} /> 
                : actualStep === 3 ? <BankDetails urlPath={path} prevStep={() => setActualStep(2)} actualStep={actualStep} percentageProgress={60} nextStep={() => setActualStep(4)} /> 
                : actualStep === 4 ? <AdditionalDocuments urlPath={path} prevStep={() => setActualStep(3)} actualStep={actualStep} percentageProgress={80} nextStep={() => setActualStep(5)} /> 
                : actualStep === 5 && <Finalization urlPath={path} prevStep={() => setActualStep(4)} actualStep={actualStep} percentageProgress={100} nextStep={() => route.push("/rh")} />
            }
        </>
    )
}

export default CadastroColaborador