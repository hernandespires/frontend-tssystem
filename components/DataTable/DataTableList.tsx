import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle
} from "../ui/item"
import { Button } from "../ui/button"
import { IoIosArrowForward } from "react-icons/io"
import { Employee } from "@/types/services/humanResources/employee"
import { FaUserFriends } from "react-icons/fa"
import { findEmployeeById } from "@/services/humanResources/employee"
import { Fragment } from "react/jsx-runtime"
import { FindEmployeeContext } from "@/contexts/rh/Employee/FindEmployeeContext"
import { useContext } from "react"
import { useRouter } from "next/navigation"

const DataTableList = ({ data }: { data: Employee[] }) => {
	const { setEmployeeFound } = useContext(FindEmployeeContext)
	const route = useRouter()

	const handleShowRegisteredEmployee = async (id: string) => {
		setEmployeeFound(await findEmployeeById(id))
		route.push("/rh/cadastro-colaborador")
	}

	return (
		<ItemGroup className="">
			{data && data.length > 0 ? (
				data.map((data) => (
					<Fragment key={data.id}>
						<Item className="p-2.5 text-default-orange">
							<ItemMedia>
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
								</Avatar>
							</ItemMedia>
							<ItemContent className="p-0">
								<ItemTitle>
									{data.name.length > 35
										? data.name.substring(0, 37) + "..."
										: data.name}
								</ItemTitle>
								<ItemDescription>
									{data.email.length > 47
										? data.email.substring(0, 47) + "..."
										: data.email}
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full"
									onClick={() => handleShowRegisteredEmployee(data.id)}
								>
									<IoIosArrowForward color="white" />
								</Button>
							</ItemActions>
							<ItemSeparator className="bg-default-border-color" />
						</Item>
					</Fragment>
				))
			) : (
				<div className="flex justify-center items-center h-full flex-col">
					<FaUserFriends size={150} color="#ffffff2b" />
					<h1 className="font-bold text-gray-300">
						Nenhum funcionário cadastrado
					</h1>
				</div>
			)}
			{/* : <div className="flex items-center gap-4"><Skeleton className="w-12 h-12 rounded-full" /><div className="space-y-2"><Skeleton className="w-62.5 h-4" /><Skeleton className="w-50 h-4" /></div></div> */}
		</ItemGroup>
	)
}

export default DataTableList
