import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "../ui/item"
import { Button } from "../ui/button"
import { IoIosArrowForward } from "react-icons/io"

interface Person { id: number, nome: string, email: string, avatar: string }

const people: Person[] = [
    {id: 1, nome: "Luizinho TS", email: "luizbarros@trajetoriadosucesso.com", avatar: "https://github.com/shadcn.png"},
    {id: 2, nome: "Kojiminha TS", email: "joãogoncalves@trajetoriadosucesso.com", avatar: "https://github.com/maxleiter.png"},
    {id: 3, nome: "Felipinho TS", email: "felipefreitas@trajetoriadosucesso.com", avatar: "https://github.com/evilrabbit.png"}
]

const DataTableList = () => (
    <ItemGroup>
        {people.map((person) => (
                <React.Fragment key={person.id}>
                    <Item className="p-2.5 text-default-orange">
                        <ItemMedia>
                            <Avatar>
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback>
                                    {person.nome.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent className="p-0">
                            <ItemTitle>
                                {person.nome}
                            </ItemTitle>
                            <ItemDescription>
                                {person.email}
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
        ))}
    </ItemGroup>
)

export default DataTableList