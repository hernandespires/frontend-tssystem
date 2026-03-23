interface InfoBadgeProps {
	fill?: boolean
	valueColor?: string
	percentColor?: string
	info: string
	children: string
	percent?: string
	period?: string
	className?: string
}

const InfoBadge = ({
	fill,
	valueColor,
	percentColor,
	info,
	children,
	percent,
	period,
	className = ""
}: InfoBadgeProps) => {
	const hasCustomColor = !!valueColor

	const labelColor = fill ? "text-black" : "text-white"
	const defaultValueColor = fill ? "text-black" : "text-white"
	const resolvedValueColor = hasCustomColor ? valueColor : defaultValueColor

	return (
		<div
			className={`
				flex flex-1 flex-col text-center justify-center rounded-md items-center py-4 px-3 min-w-0
				${fill ? "bg-default-orange" : "bg-transparent border border-default-border-color"}
				${className}
			`}
		>
			<span className={`text-sm font-semibold leading-tight ${labelColor}`}>
				{info}
			</span>
			<span className={`text-4xl font-extrabold mt-1.5 leading-none tracking-tight ${resolvedValueColor}`}>
				{children}
			</span>
			{percent && period && (
				<span className={`text-xs mt-1.5 ${fill ? "text-black/70" : "text-gray-400"}`}>
					<span className={`font-bold ${percentColor ? percentColor : fill ? "text-black" : "text-default-orange"}`}>
						{percent}
					</span>
					{" "}({period})
				</span>
			)}
		</div>
	)
}

export default InfoBadge
