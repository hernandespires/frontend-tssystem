"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IoIosArrowForward } from "react-icons/io"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"

export interface ActivityItem {
	id: string
	avatar?: string
	avatarFallback?: string
	description: React.ReactNode
	subtitle: string
}

interface ActivityListProps {
	title: string
	items: ActivityItem[]
	emptyMessage?: string
	footerLabel: string
	onFooterClick?: () => void
	onItemClick?: (id: string) => void
}

const ActivityList = ({
	title,
	items,
	emptyMessage = "Nenhum item encontrado",
	footerLabel,
	onFooterClick,
	onItemClick
}: ActivityListProps) => {
	return (
		<div className="flex flex-col border border-default-border-color rounded-md px-6 py-5 h-full">
			<h2 className="section-title mb-2">{title}</h2>

			<div className="flex flex-col flex-1 justify-center">
				{items.length > 0 ? (
					items.map((item, index) => (
						<div
							key={item.id}
							className={`
								flex items-center justify-between py-4
								${index < items.length - 1 ? "border-b border-default-border-color" : ""}
							`}
						>
							<div className="flex items-center gap-3.5">
								<Avatar className="w-11 h-11 shrink-0">
									<AvatarImage src={item.avatar} />
									<AvatarFallback className="bg-default-orange/20 text-default-orange font-bold text-sm">
										{item.avatarFallback ?? "?"}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col gap-0.5">
									<span className="text-sm leading-snug">{item.description}</span>
									<span className="text-xs text-gray-500">{item.subtitle}</span>
								</div>
							</div>
							<button
								onClick={() => onItemClick?.(item.id)}
								className="flex items-center gap-1.5 text-default-orange font-bold text-sm hover:underline cursor-pointer shrink-0 ml-6"
							>
								Ver <IoIosArrowForward size={16} />
							</button>
						</div>
					))
				) : (
					<div className="flex items-center justify-center flex-1 text-gray-500 py-8">
						{emptyMessage}
					</div>
				)}
			</div>

			<div className="flex justify-center pt-4 mt-auto">
				<Button
					variant="outline"
					size="sm"
					className="px-5 py-2.5 cursor-pointer text-sm gap-2"
					onClick={onFooterClick}
				>
					<RiGitRepositoryCommitsFill size={16} />
					{footerLabel}
				</Button>
			</div>
		</div>
	)
}

export default ActivityList
