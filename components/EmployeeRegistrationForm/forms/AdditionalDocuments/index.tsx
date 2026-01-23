"use client"

import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction, useContext } from "react"
import FileUploadPreview from "../../components/FileUploadPreview"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { onChangeFormStep } from "@/hooks/useIsValidFormField"
import { SendEmployee } from "@/types/services/rh/employee"
import { Field, FieldError } from "@/components/ui/field"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"

const AdditionalDocuments = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: 
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const { employeeInformations, setEmployeeInformations } = useContext(CreateEmployeeContext)

    const form = useZodForm(formSchema)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))
    
    const handleNextStep = (values: SendEmployee) => {
        onChangeFormStep({ form, fields: { ...values, additionalDocuments: values.additionalDocuments.map((file) => file.name) }, setData: setEmployeeInformations, nextStep })
    }

    console.log(employeeInformations)

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={handleNextStep}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Documentos Adicionais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <Field className="flex min-h-112 py-3">
                    <div className="flex flex-col items-center w-fit">
                        <FileUploadPreview fieldName="additionalDocuments" form={form} />
                        <FieldError>
                                {firstErrorKey === "additionalDocuments" && String(form.formState.errors.additionalDocuments?.message)}
                        </FieldError>
                    </div>
                </Field>
            </RegistrationForm>
        </section>
    )
}

export default AdditionalDocuments