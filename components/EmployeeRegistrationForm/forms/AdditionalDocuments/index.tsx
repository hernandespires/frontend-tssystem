"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction } from "react"
import FileUploadPreview from "./FileUploadPreview"

const AdditionalDocuments = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: 
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema)
    })

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={() => nextStep(5)}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="flex justify-center h-112 py-3">
                    <FileUploadPreview />
                </div>
            </RegistrationForm>
        </section>
    )
}

export default AdditionalDocuments