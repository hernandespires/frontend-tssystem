import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import DataTableList from "./DataTableList"
import { Button } from "../ui/button"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"

const DataTable = ({ filter }: { filter: string }) => (
    <section className="flex flex-col gap-2.5 border-1 border-default-border-color px-5.5 py-3.5 text-default-orange max-w-147 rounded-md">
        <h1 className="text-2xl font-bold">
            Lista de { filter }
        </h1>
        <InputGroup>
            <InputGroupInput placeholder={ filter } />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
        <DataTableList />
        <div className="flex justify-end">
            <Button variant="default" size="sm" className="p-4.5">
                <RiGitRepositoryCommitsFill />
                Ver todos { filter }
            </Button>
        </div>
    </section>
)

export default DataTable