const InfoBadge = ({
	fill,
	valueColor = "white",
	info,
	children,
	percent,
	period
}: {
	fill?: boolean
	valueColor?: string
	info: string
	children: string
	percent?: string
	period?: string
}) => {
	const periodDetails = () => {
		if (!fill) {
			if (percent && period) {
				return (
					<div className="text-xs">
						<span className="text-default-orange">{percent}</span>
						<span className="">({period})</span>
					</div>
				)
			}
		}
	}

	return (
		<div
			className={`w-45 flex flex-col text-center justify-center rounded-[6px] items-center p-1.75  ${fill ? "bg-default-orange" : "bg-transparent border"}`}
		>
			<span
				className={`flex justify-center items-center text-lg font-semibold w-38 break-normal text-center ${fill ? "text-black" : "text-white"}`}
			>
				{info}
			</span>
			<span className={`text-6xl font-bold ${fill ? "text-black" : `text-${valueColor}-500`}`}>{children}</span>
			{periodDetails()}
		</div>
	)
}

export default InfoBadge
