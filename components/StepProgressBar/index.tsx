import { Progress } from "../ui/progress"

const StepProgressBar = ({ actualStep, percentageProgress }: { actualStep: number; percentageProgress: number }) => (
	<div className="flex flex-col justify-center items-center gap-3">
		<h1 className="text-2xl font-bold text-default-orange">{actualStep}/5 - Dados Pessoais</h1>
		<Progress value={percentageProgress} className="max-w-107.5" />
	</div>
)

export default StepProgressBar
