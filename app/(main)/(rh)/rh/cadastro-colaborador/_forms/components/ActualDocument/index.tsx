import Link from "next/link"

const extractNames = (value: unknown): string[] => {
    if (!value) return []

    if (typeof value === "string") return [value]

    if (Array.isArray(value)) return value.filter(v => typeof v === "string")

    if (value instanceof FileList) return Array.from(value).map(f => f.name)

    if (Array.isArray(value) && value[0] instanceof File) return value.map((f: File) => f.name)

    return []
}

const ActualDocument = ({ children, className }: { children?: unknown, className?: string }) => {
    const names = extractNames(children)
    if (!names.length) return null

    return (
        <div className={`text-sm text-gray-400 ${ className }`}>
            <p>
                Documento(s) atual(is):
            </p>
            <span className="text-blue-400 underline cursor-pointer block">
                {names.map((name, i) => <Link key={i} className="block" href={`https://backend.trajetoriadosucesso.com/file/download/${name}`}>{name.length > 26 ? `${name.slice(0,26)}...` : name}</Link>)} 
            </span>
        </div>
    )
}

export default ActualDocument
