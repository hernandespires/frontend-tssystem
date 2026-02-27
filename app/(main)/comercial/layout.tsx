"use client"

import Header from "@/components/Header"
import { ReactNode } from "react"

const ComercialLayout = ({ children }: { children: ReactNode }) => (
	<>
		<Header department="Comercial" />
		<section className="flex flex-col items-center">
			<div className="flex flex-col gap-6 w-303">{children}</div>
		</section>
	</>
)

export default ComercialLayout
