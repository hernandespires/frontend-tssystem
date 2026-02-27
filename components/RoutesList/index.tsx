import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { SlashIcon } from "lucide-react"

const RoutesList = ({ children }: { children: { name: string; route: string }[] }) => (
	<Breadcrumb>
		<BreadcrumbList>
			{children.map((route, index) => {
				const actualRoute = children.length - 1

				return (
					<div key={index} className="flex items-center gap-1.5">
						<BreadcrumbItem>
							<BreadcrumbLink asChild className={`${actualRoute === index && "text-default-orange"} hover:text-default-orange`}>
								<Link href={route.route}>{route.name}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{actualRoute > index && (
							<BreadcrumbSeparator>
								<SlashIcon />
							</BreadcrumbSeparator>
						)}
					</div>
				)
			})}
		</BreadcrumbList>
	</Breadcrumb>
)

export default RoutesList
