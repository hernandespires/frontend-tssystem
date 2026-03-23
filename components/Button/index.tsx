"use client"

import { ReactNode } from "react"

interface ActionButtonProps {
	isFulled?: boolean
	isDashed?: boolean
	horizontal?: boolean
	flexible?: boolean
	onClick: () => void
	icon: ReactNode
	children: string
	className?: string
}

const ActionButton = ({
	isFulled,
	isDashed = false,
	horizontal = false,
	flexible = false,
	onClick,
	icon,
	children,
	className = ""
}: ActionButtonProps) => {
	const bgClass = isFulled && !isDashed
		? "bg-default-orange"
		: isDashed
			? "border border-dashed border-default-border-color"
			: "border border-default-border-color"

	const textColor = isFulled ? "text-black" : "text-white"

	if (horizontal) {
		return (
			<button
				onClick={onClick}
				className={`
					flex items-center rounded-md gap-5 px-7 py-6 flex-1 transition cursor-pointer
					hover:brightness-110
					${bgClass} ${className}
				`}
			>
				{icon}
				<span className={`font-bold text-xl leading-tight ${textColor}`}>{children}</span>
			</button>
		)
	}

	const sizeClass = flexible ? "flex-1 min-w-0 py-6" : "w-46 h-44"
	const textSizeClass = flexible ? "text-base px-2" : "text-lg w-36"

	return (
		<button
			onClick={onClick}
			className={`
				flex flex-col justify-center items-center rounded-md gap-2.5 ${sizeClass} transition cursor-pointer
				hover:brightness-110
				${bgClass} ${className}
			`}
		>
			{icon}
			<span className={`font-bold text-center leading-tight ${textSizeClass} ${textColor}`}>
				{children}
			</span>
		</button>
	)
}

export default ActionButton
