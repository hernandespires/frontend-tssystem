import { Progress } from "../ui/progress"

const StepProgressBar = ({
	actualStep,
	percentageProgress,
	maxSteps = 5,
	title = "Dados Pessoais"
}: {
	actualStep: number
	percentageProgress: number
	maxSteps?: number
	title?: string
}) => (
	<div className="flex flex-col justify-center items-center gap-3">
		<h1 className="text-2xl font-bold text-default-orange">
			{actualStep}/{maxSteps} - {title}
		</h1>
		<Progress value={percentageProgress} className="max-w-107.5" />
	</div>
)

export default StepProgressBar
