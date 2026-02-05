import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../../../../components/ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction, useContext } from "react"
import { CreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { SendEmployee } from "@/types/services/humanResources/employee"
import { Field, FieldError } from "@/components/ui/field"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { UploadContext } from "@/contexts/files/UploadContext"
import FileUploadPreview from "../components/FileUploadPreview"
import ActualDocument from "../components/ActualDocument"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"

const AdditionalDocuments = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: 
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const { employeeData, setEmployeeData } = useContext(CreateEmployeeContext)
    const { uploadData, setUploadData } = useContext(UploadContext)
    const { employeeFound } = useContext(FindEmployeeContext)

    const form = useZodForm(formSchema)

    const errors = form.formState.errors
    const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))
    
const handleNextStep = async (values: SendEmployee) => {
  const fileNames = uploadData.map(file => file.name)

  await useIsValidFormField({
    form,
    fields: {
      ...values,
      additionalDocuments: fileNames
    },
    setData: setEmployeeData,
    nextStep
  })
}


    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={handleNextStep}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Documentos Adicionais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <ActualDocument>
  {employeeFound?.additionalDocuments?.length
    ? employeeFound.additionalDocuments
    : employeeData.additionalDocuments}
</ActualDocument>
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