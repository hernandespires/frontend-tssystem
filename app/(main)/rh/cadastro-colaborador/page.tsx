"use client"

import BankDetails from "@/components/EmployeeRegistrationForm/BankDetails"
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
                actualStep === 1 ? <PersonalInformation urlPath={path} prevStep={() => route.push("/rh")} actualStep={actualStep} percentageProgress={20} nextStep={setActualStep} /> 
                : actualStep === 2 ? <LaborDocuments urlPath={path} prevStep={() => setActualStep(actualStep - 1)} actualStep={actualStep} percentageProgress={20} nextStep={setActualStep} /> 
                : actualStep === 3 ? <BankDetails urlPath={path} prevStep={() => setActualStep(actualStep - 1)} actualStep={actualStep} percentageProgress={20} nextStep={setActualStep} /> 
                : actualStep === 4 ? <LaborDocuments urlPath={path} prevStep={() => setActualStep(actualStep - 1)} actualStep={actualStep} percentageProgress={20} nextStep={setActualStep} /> 
                : actualStep === 5 && <LaborDocuments urlPath={path} prevStep={() => setActualStep(actualStep - 1)} actualStep={actualStep} percentageProgress={20} nextStep={setActualStep} />
            }
        </>
    )
}

export default CadastroColaborador