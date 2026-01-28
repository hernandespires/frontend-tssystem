import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "../ui/item"
import { Button } from "../ui/button"
import { IoIosArrowForward } from "react-icons/io"
import { Employee } from "@/types/services/humanResources/employee" 
import { FaUserFriends } from "react-icons/fa"

const DataTableList = ({ data }: { data: Employee[] }) => (
    <ItemGroup className="h-full">
        { data ? (
            data.map((data) => (
                <React.Fragment key={data.id}>
                    <Item className="p-2.5 text-default-orange">
                        <ItemMedia>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    {data.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent className="p-0">
                            <ItemTitle>
                                {data.name} 
                            </ItemTitle>
                            <ItemDescription>
                                {data.email}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <IoIosArrowForward color="white" />
                            </Button>
                        </ItemActions>
                        <ItemSeparator className="bg-default-border-color" />
                    </Item>
                </React.Fragment>
            ))
        ) : <div className="flex justify-center items-center h-full flex-col"><FaUserFriends size={150} color="#ffffff2b" /><h1 className="font-bold text-gray-300">Nenhum funcionário cadastrado</h1></div> }
        {/* : <div className="flex items-center gap-4"><Skeleton className="w-12 h-12 rounded-full" /><div className="space-y-2"><Skeleton className="w-62.5 h-4" /><Skeleton className="w-50 h-4" /></div></div> */}
    </ItemGroup>
)

export default DataTableList