// import Link from "next/link"

// const ActualDocument = ({ children }: { children: string }) => {
//     if (!children) return

//     console.log(children?.[0]?.name ?? children, "children")

//     return (
//         <div className={`text-sm text-gray-400 ${Array.isArray(children) && "text-center"}`}>
//             {Array.isArray(children) ? <p>Documento(s) atual(is):</p> : <>Documento(s) atual(is) -</>}
//             <span className="text-blue-400 underline cursor-pointer block">
//                 { 
//                     Array.isArray(children) ? (
//                         children?.map((file, index) => file.length > 26 ? (
//                             <Link key={index} className="block" href={`http://localhost:8080/file/download/${file}`}>{file.slice(0, 26)}...</Link>
//                         ) : (
//                             <Link key={index} className="block" href={`http://localhost:8080/file/download/${file}`}>{file}</Link>
//                         ))
//                     ) : (
//                         <Link key={ children?.[0]?.name ?? children } className="block" href={`http://localhost:8080/file/download/${ children?.[0]?.name ?? children }`}>{ children?.[0]?.name ?? children }</Link>
//                     )
//                 }
//             </span>
//         </div>
//     )
// }

// export default ActualDocument

import Link from "next/link"

type Props = {
    children?: unknown
}

const extractNames = (value: unknown): string[] => {

    if (!value) return []

    if (typeof value === "string")
        return [value]

    if (Array.isArray(value))
        return value.filter(v => typeof v === "string")

    if (value instanceof FileList)
        return Array.from(value).map(f => f.name)

    if (Array.isArray(value) && value[0] instanceof File)
        return value.map((f: File) => f.name)

    return []
}

const ActualDocument = ({ children }: Props) => {

    const names = extractNames(children)

    if (!names.length) return null

    return (
        <div className="text-sm text-gray-400">
            <p>Documento(s) atual(is):</p>

            <span className="text-blue-400 underline cursor-pointer block">
                {names.map((name, i) => (
                    <Link
                        key={i}
                        className="block"
                        href={`http://localhost:8080/file/download/${name}`}
                    >
                        {name.length > 26 ? `${name.slice(0,26)}...` : name}
                    </Link>
                ))}
            </span>
        </div>
    )
}

export default ActualDocument