"use client"

import { ReactNode } from "react"

const Button = ({
	isFulled,
	isDashed = false,
	onClick,
	icon,
	children
}: {
	isFulled?: boolean
	isDashed?: boolean
	onClick: () => void
	icon: ReactNode
	children: string
}) => {
	return (
		<button
			className={`
                flex flex-col justify-center items-center rounded gap-3 w-46 h-46 transition cursor-pointer
                ${isFulled && !isDashed ? "bg-default-orange" : !isFulled && isDashed ? "border border-dashed" : !isFulled && !isDashed && "border border-default-border-color"}
            `}
			onClick={onClick}
		>
			{icon}
			<span
				className={`font-semibold text-xl w-36 ${isFulled && "text-black"}`}
			>
				{children}
			</span>
		</button>
	)
}

export default Button
