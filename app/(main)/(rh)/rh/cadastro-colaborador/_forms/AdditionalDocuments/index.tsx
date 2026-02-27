"use client"

import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
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
import StepProgressBar from "@/components/StepProgressBar"

const AdditionalDocuments = ({
	urlPath,
	prevStep,
	actualStep,
	percentageProgress,
	nextStep
}: {
	urlPath: { name: string; route: string }[]
	prevStep: () => void
	actualStep: number
	percentageProgress: number
	nextStep: Dispatch<SetStateAction<number>>
}) => {
	const { employeeData, setEmployeeData } = useContext(CreateEmployeeContext)
	const { uploadData } = useContext(UploadContext)
	const { employeeFound } = useContext(FindEmployeeContext)

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

	const handleNextStep = async (values: SendEmployee) => {
		await useIsValidFormField({ form, fields: values, setData: setEmployeeData, nextStep })
	}

	return (
		<section>
			<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={handleNextStep}>
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
		</section>
	)
}

export default AdditionalDocuments
