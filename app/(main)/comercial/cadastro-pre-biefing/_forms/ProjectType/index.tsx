import RegistrationForm from "@/components/RegistrationForm"
import { formSchema } from "./formSchema"
import { useZodForm } from "@/hooks/useZodForm"
import StepProgressBar from "@/components/StepProgressBar"
import Button from "@/components/Button"
import Image from "next/image"

const ProjectType = ({
	urlPath,
	prevStep,
	actualStep,
	percentageProgress
}: {
	urlPath: { name: string; route: string }[]
	prevStep: number
	actualStep: number
	percentageProgress: number
}) => {
	const form = useZodForm(formSchema, "comercial")

	const handleNextStep = () => {}

	return (
		<section>
			<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} haveAdvanceButton={false} nextStep={handleNextStep}>
				<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
				<div className="flex justify-center gap-x-6">
					<Button isFulled onClick={() => ""} icon={<Image src={"/icons/loop-left-arrow.svg"} width={48} height={48} alt="loop left arrow" />}>
						Pontual
					</Button>
					<Button isFulled onClick={() => ""} icon={<Image src={"/icons/loop-left-arrow.svg"} width={48} height={48} alt="loop left arrow" />}>
						Pontual
					</Button>
				</div>
			</RegistrationForm>
		</section>
	)
}

export default ProjectType
