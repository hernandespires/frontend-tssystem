import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import StepProgressBar from "@/components/StepProgressBar"
import Button from "@/components/Button"
import Image from "next/image"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { FormType } from "@/types/form"
import { useContractStore } from "@/store/financial/CreateContract"

const ProjectType = ({ urlPath, prevStep, actualStep, percentageProgress, nextStep }: FormType) => {
	const form = useZodForm(formSchema, "comercial")
	const { addContract } = useContractStore()

	const handleNextStep = async (value: string) => {
		await useIsValidFormField({
			form,
			fields: { contractType: value } as never,
			setData: addContract as never,
			nextStep
		})
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} haveAdvanceButton={false} nextStep={() => {}}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<div className="flex justify-center gap-x-6">
				<Button
					isFulled
					onClick={() => {
						form?.setValue("contractType", "PUNCTUAL")
						handleNextStep("PUNCTUAL")
					}}
					icon={<Image src={"/icons/loop-left-arrow.svg"} width={48} height={48} alt="loop left arrow" />}
				>
					Pontual
				</Button>
				<Button
					isFulled
					onClick={() => {
						form?.setValue("contractType", "APPELLANT")
						handleNextStep("APPELLANT")
					}}
					icon={<Image src={"/icons/loop-arrow.svg"} width={48} height={48} alt="loop arrow" />}
				>
					Recorrente
				</Button>
			</div>
		</RegistrationForm>
	)
}

export default ProjectType
