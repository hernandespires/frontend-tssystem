import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import StepProgressBar from "@/components/StepProgressBar"
import Button from "@/components/Button"
import Image from "next/image"
import { useIsValidFormField } from "@/hooks/useIsValidFormField"
import { Dispatch, SetStateAction } from "react"
import { usePreBriefingStore } from "@/store/comercial/CreatePreBriefing"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"

const ProjectType = ({
	urlPath,
	prevStep,
	actualStep,
	percentageProgress,
	nextStep
}: {
	urlPath: { name: string; route: string }[]
	prevStep: number
	actualStep: number
	percentageProgress: number
	nextStep: Dispatch<SetStateAction<number>>
}) => {
	const form = useZodForm(formSchema, "comercial")
	const { allPreBriefings, addPreBriefing } = usePreBriefingStore()

	const handleNextStep = async (values: SendPreBriefing) => {
		await useIsValidFormField({ form, fields: values, setData: addPreBriefing, nextStep })
	}

	return (
		<section>
			<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} haveAdvanceButton={false} nextStep={handleNextStep}>
				<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
				<div className="flex justify-center gap-x-6">
					<Button
						isFulled
						onClick={() => handleNextStep("pontual")}
						icon={<Image src={"/icons/loop-left-arrow.svg"} width={48} height={48} alt="loop left arrow" />}
					>
						Pontual
					</Button>
					<Button
						isFulled
						onClick={() => handleNextStep("recorrente")}
						icon={<Image src={"/icons/loop-arrow.svg"} width={48} height={48} alt="loop left arrow" />}
					>
						Recorrente
					</Button>
				</div>
			</RegistrationForm>
		</section>
	)
}

export default ProjectType
