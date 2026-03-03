import { FormType } from "@/types/form"
import RegistrationForm from "../RegistrationForm"
import StepProgressBar from "../StepProgressBar"
import { Separator } from "../ui/separator"

const Form = ({
	formSchema,
	urlPath,
	form,
	prevStep,
	nextStep,
	actualStep,
	percentageProgress,
	hasTwoForm = false,
	formContent,
	leftFormContent,
	rightFormContent
}: FormType) => (
	<RegistrationForm formSchema={formSchema} urlPath={urlPath} form={form} prevStep={prevStep} nextStep={nextStep}>
		<StepProgressBar actualStep={actualStep} percentageProgress={percentageProgress} />
		{!hasTwoForm ? (
			<section className="w-115 self-center flex flex-wrap gap-3 justify-between items-center">{formContent}</section>
		) : (
			<section className="flex justify-center items-stretch gap-x-22.5 w-230 py-3 self-center">
				<div className="w-full flex flex-col gap-y-3">{leftFormContent}</div>
				<div>
					<Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
				</div>
				<div className="w-full flex flex-col gap-y-3">{rightFormContent}</div>
			</section>
		)}
	</RegistrationForm>
)

export default Form
