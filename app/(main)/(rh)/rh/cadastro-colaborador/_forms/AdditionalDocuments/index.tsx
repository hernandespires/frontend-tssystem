"use client"

import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useEffect } from "react"
import { useCreateEmployeeContext } from "@/contexts/rh/Employee/CreateEmployeeContext"
import { useZodForm } from "@/hooks/useZodForm"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { Field, FieldError } from "@/components/ui/field"
import { useGetFirstErrorKey } from "@/hooks/useGetFirstErrorKey"
import { useUploadContext } from "@/contexts/files/UploadContext"
import FileUploadPreview from "../components/FileUploadPreview"
import ActualDocument from "../components/ActualDocument"
import { useFindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import StepProgressBar from "@/components/StepProgressBar"
import { FormType } from "@/types/form"

const AdditionalDocuments = ({ urlPath, prevStep, actualStep, percentageProgress, nextStep }: FormType) => {
	const { employeeData, setEmployeeData } = useCreateEmployeeContext()
	const { uploadData } = useUploadContext()
	const { employeeFound } = useFindEmployeeContext()

	const form = useZodForm(formSchema, "rh", {
		defaultValues: {
			additionalDocuments: uploadData.additionalDocuments ?? employeeData.additionalDocuments ?? []
		}
	})

	useEffect(() => {
		form.setValue("additionalDocuments", uploadData.additionalDocuments ?? [], { shouldValidate: true })
	}, [uploadData.additionalDocuments, form])

	const errors = form.formState.errors
	const firstErrorKey = useGetFirstErrorKey(errors, Object.keys(formSchema.shape))

	const handleNextStep = async (values: unknown) => {
		await useIsValidFormField({
			form: form as never,
			fields: values as never,
			setData: setEmployeeData as never,
			nextStep
		})
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form as never} prevStep={prevStep} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<ActualDocument className="text-center">
				{employeeFound?.additionalDocuments?.length ? employeeFound.additionalDocuments : employeeData.additionalDocuments}
			</ActualDocument>
			<Field className="flex min-h-112 py-3">
				<div className="flex flex-col items-center w-fit">
					<FileUploadPreview fieldName="additionalDocuments" form={form} />
					<FieldError>{firstErrorKey === "additionalDocuments" && String(form.formState.errors.additionalDocuments?.message)}</FieldError>
				</div>
			</Field>
		</RegistrationForm>
	)
}

export default AdditionalDocuments
