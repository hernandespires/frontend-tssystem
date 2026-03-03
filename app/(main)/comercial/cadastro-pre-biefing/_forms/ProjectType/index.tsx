import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import StepProgressBar from "@/components/StepProgressBar"
import Button from "@/components/Button"
import Image from "next/image"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { FormType } from "@/types/form"

const ProjectType = ({ urlPath, prevStep, actualStep, percentageProgress, nextStep }: FormType) => {
	const form = useZodForm(formSchema, "comercial")
	const { addPreBriefing } = usePreBriefingStore()

	const handleNextStep = async (value: SendPreBriefing) => {
		await useIsValidFormField({ form, fields: { projectType: value }, setData: addPreBriefing, nextStep })
	}

	return (
		<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} haveAdvanceButton={false} nextStep={handleNextStep}>
			<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
			<div className="flex justify-center gap-x-6">
				<Button
					isFulled
					onClick={() => {
						form.setValue("projectType", "pontual")
						handleNextStep("pontual")
					}}
					icon={<Image src={"/icons/loop-left-arrow.svg"} width={48} height={48} alt="loop left arrow" />}
				>
					Pontual
				</Button>
				<Button
					isFulled
					onClick={() => {
						form.setValue("projectType", "recorrente")
						handleNextStep("recorrente")
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
