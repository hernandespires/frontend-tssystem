"use client"

import Header from "@/components/Header"

const MetricsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<main>
		<Header department="Recursos Humanos" />
		<section className="max-w-303 m-auto">{children}</section>
	</main>
)

export default MetricsLayout
