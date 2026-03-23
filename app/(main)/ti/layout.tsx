"use client"

import Header from "@/components/Header"
import { ReactNode } from "react"

const TiLayout = ({ children }: { children: ReactNode }) => (
	<>
		<Header department="TI" />
		<section className="flex flex-col items-center">
			<div className="flex flex-col gap-6 w-303">{children}</div>
		</section>
	</>
)

export default TiLayout
