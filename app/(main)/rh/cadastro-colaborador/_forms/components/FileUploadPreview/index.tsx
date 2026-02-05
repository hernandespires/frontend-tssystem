// "use client"

// import { Controller } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { X } from "lucide-react"
// import { ChangeEvent, useEffect, useState } from "react"
// import Image from "next/image"

// type PreviewFile = { file: File, url: string }
// type FileUploadPreviewProps = { fieldName: string, form: any }

// const FileUploadPreview = ({ fieldName, form }: FileUploadPreviewProps) => {
//     const [files, setFiles] = useState<PreviewFile[]>([])

//     return (
//         <Controller name={fieldName} control={form.control} render={({ field }) => {            
//             useEffect(() => {
//                 field.onChange(files.map((item) => item.file))
//             }, [files])
            
//             useEffect(() => {
//                 return () => files.forEach((item) => URL.revokeObjectURL(item.url))                
//             }, [files])

//             return (
//                 <section className="space-y-4">
//                     <Input type="file" multiple onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                         const fileList = event.target.files
//                         if (!fileList) return

//                         const newFiles: PreviewFile[] = Array.from(fileList).map((file) => ({ file, url: URL.createObjectURL(file) }))
//                         setFiles((prev) => [...prev, ...newFiles])

//                         event.target.value = ""
//                     }} />                
//                     <div className="flex flex-col gap-2">
//                         {files.map((item, index) => (
//                             <div key={`${item.file.name}-${index}`} className="relative flex items-center gap-3 border rounded-lg p-2">
//                                 {item.file.type.startsWith("image/") ? (
//                                     <Image src={item.url} width={64} height={64} alt={item.file.name} className="rounded-md object-cover" />
//                                 ) : (
//                                     <span className="text-sm text-muted-foreground">{item.file.name}</span>
//                                 )}
//                                 <span className="flex-1 truncate text-sm">
//                                     {item.file.name}
//                                 </span>
//                                 <Button type="button" size="icon" variant="destructive" className="h-6 w-6" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}>
//                                     <X size={14} />
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )
//         }} />
//     )
// }

// export default FileUploadPreview











// "use client"

// import { Controller, useWatch } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { X } from "lucide-react"
// import { ChangeEvent, useEffect, useState } from "react"
// import Image from "next/image"

// type ExistingFile = string
// type UploadFile = File

// type PreviewItem =
//   | { type: "new"; file: UploadFile; url: string }
//   | { type: "existing"; name: ExistingFile }

// type FileUploadPreviewProps = {
//   fieldName: string
//   form: any
// }

// const FileUploadPreview = ({ fieldName, form }: FileUploadPreviewProps) => {
//   const watchedFiles = useWatch({
//     control: form.control,
//     name: fieldName
//   }) as Array<UploadFile | ExistingFile> || []

//   const [previews, setPreviews] = useState<PreviewItem[]>([])

//   /**
//    * 🔁 Cria previews enquanto o step está ativo
//    */
//   useEffect(() => {
//     if (!watchedFiles.length) {
//       setPreviews([])
//       return
//     }

//     const mapped: PreviewItem[] = watchedFiles.map((item) => {
//       if (item instanceof File) {
//         return {
//           type: "new",
//           file: item,
//           url: URL.createObjectURL(item)
//         }
//       }

//       return {
//         type: "existing",
//         name: item
//       }
//     })

//     setPreviews(mapped)

//     return () => {
//       mapped.forEach((item) => {
//         if (item.type === "new") {
//           URL.revokeObjectURL(item.url)
//         }
//       })
//     }
//   }, [watchedFiles])

//   /**
//    * 🧹 CLEANUP DEFINITIVO
//    * Remove Files quando o usuário sai do step
//    */
//   useEffect(() => {
//     return () => {
//       const onlyExisting = watchedFiles.filter(
//         (item): item is string => typeof item === "string"
//       )

//       form.setValue(fieldName, onlyExisting, {
//         shouldValidate: false,
//         shouldDirty: false
//       })
//     }
//   }, [])

//   const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
//     const fileList = event.target.files
//     if (!fileList) return

//     const newFiles = Array.from(fileList)
//     const updated = [...watchedFiles, ...newFiles]

//     form.setValue(fieldName, updated, { shouldValidate: true })
//     event.target.value = ""
//   }

//   const handleRemove = (index: number) => {
//     const updated = watchedFiles.filter((_, i) => i !== index)
//     form.setValue(fieldName, updated, { shouldValidate: true })
//   }

//   return (
//     <section className="space-y-4">
//       <Controller
//         name={fieldName}
//         control={form.control}
//         render={() => (
//           <Input
//             type="file"
//             multiple
//             onChange={handleAddFiles}
//           />
//         )}
//       />

//       <div className="flex flex-col gap-2">
//         {previews.map((item, index) => (
//           <div
//             key={`${item.type}-${index}`}
//             className="relative flex items-center gap-3 border rounded-lg p-2"
//           >
//             {item.type === "new" ? (
//               item.file.type.startsWith("image/") ? (
//                 <Image
//                   src={item.url}
//                   width={64}
//                   height={64}
//                   alt={item.file.name}
//                   className="rounded-md object-cover"
//                 />
//               ) : (
//                 <span className="text-sm text-muted-foreground">
//                   {item.file.name}
//                 </span>
//               )
//             ) : (
//               <span className="text-sm text-muted-foreground">
//                 {item.name}
//               </span>
//             )}

//             <span className="flex-1 truncate text-sm">
//               {item.type === "new" ? item.file.name : item.name}
//             </span>

//             <Button
//               type="button"
//               size="icon"
//               variant="destructive"
//               className="h-6 w-6"
//               onClick={() => handleRemove(index)}
//             >
//               <X size={14} />
//             </Button>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default FileUploadPreview










// "use client"

// import { Controller } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { X } from "lucide-react"
// import { ChangeEvent, useEffect, useRef, useState } from "react"
// import Image from "next/image"

// type PreviewFile = {
//   file: File
//   url: string
// }

// type FileUploadPreviewProps = {
//   fieldName: string
//   form: any
// }

// const FileUploadPreview = ({ fieldName, form }: FileUploadPreviewProps) => {
//   const fieldRef = useRef<any>(null)
//   const initializedRef = useRef(false)

//   const [files, setFiles] = useState<PreviewFile[]>([])

//   useEffect(() => {
//     if (initializedRef.current) return

//     const rawValue = form.getValues(fieldName)

//     if (Array.isArray(rawValue)) {
//       const validFiles = rawValue.filter(
//         (item): item is File => item instanceof File
//       )

//       if (validFiles.length) {
//         const mapped = validFiles.map((file) => ({
//           file,
//           url: URL.createObjectURL(file)
//         }))

//         setFiles(mapped)
//       }
//     }

//     initializedRef.current = true
//   }, [form, fieldName])

//   // 🔹 sincroniza com RHF SOMENTE após init
//   useEffect(() => {
//     if (!fieldRef.current || !initializedRef.current) return

//     fieldRef.current.onChange(files.map((item) => item.file))
//   }, [files])

//   // 🔹 limpa URLs corretamente
//   useEffect(() => {
//     return () => {
//       files.forEach((item) => URL.revokeObjectURL(item.url))
//     }
//   }, [files])

//   const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
//     const fileList = event.target.files
//     if (!fileList) return

//     const newFiles: PreviewFile[] = Array.from(fileList).map((file) => ({
//       file,
//       url: URL.createObjectURL(file)
//     }))

//     setFiles((prev) => [...prev, ...newFiles])
//     event.target.value = ""
//   }

//   const handleRemove = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index))
//   }

//   return (
//     <Controller
//       name={fieldName}
//       control={form.control}
//       render={({ field }) => {
//         fieldRef.current = field

//         return (
//           <section className="space-y-4">
//             <Input
//               type="file"
//               multiple
//               onChange={handleAddFiles}
//             />

//             <div className="flex flex-col gap-2">
//               {files.map((item, index) => (
//                 <div
//                   key={`${item.file.name}-${index}`}
//                   className="relative flex items-center gap-3 border rounded-lg p-2"
//                 >
//                   {item.file.type.startsWith("image/") ? (
//                     <Image
//                       src={item.url}
//                       width={64}
//                       height={64}
//                       alt={item.file.name}
//                       className="rounded-md object-cover"
//                     />
//                   ) : (
//                     <span className="text-sm text-muted-foreground">
//                       {item.file.name}
//                     </span>
//                   )}

//                   <span className="flex-1 truncate text-sm">
//                     {item.file.name}
//                   </span>

//                   <Button
//                     type="button"
//                     size="icon"
//                     variant="destructive"
//                     className="h-6 w-6"
//                     onClick={() => handleRemove(index)}
//                   >
//                     <X size={14} />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )
//       }}
//     />
//   )
// }

// export default FileUploadPreview










"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import Image from "next/image"
import { UploadContext } from "@/contexts/files/UploadContext"

type PreviewFile = {
  file: File
  url: string
}

const FileUploadPreview = () => {
  const uploadContext = useContext(UploadContext)
  if (!uploadContext) return null

  const { uploadData, setUploadData } = uploadContext
  const [files, setFiles] = useState<PreviewFile[]>([])

  // 🔁 sincroniza preview ao voltar etapa
  useEffect(() => {
    if (!Array.isArray(uploadData)) return

    const mapped = uploadData.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }))

    setFiles(mapped)

    return () => {
      mapped.forEach(item => URL.revokeObjectURL(item.url))
    }
  }, [uploadData])

  const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (!fileList) return

    const newFiles = Array.from(fileList)

    setUploadData(prev => [...(prev ?? []), ...newFiles])
    event.target.value = ""
  }

  const handleRemove = (index: number) => {
    setUploadData(prev => (prev ?? []).filter((_, i) => i !== index))
  }

  return (
    <section className="space-y-4">
      <Input type="file" multiple onChange={handleAddFiles} />

      <div className="flex flex-col gap-2">
        {files.map((item, index) => (
          <div
            key={`${item.file.name}-${index}`}
            className="relative flex items-center gap-3 border rounded-lg p-2"
          >
            {item.file.type.startsWith("image/") ? (
              <Image
                src={item.url}
                width={64}
                height={64}
                alt={item.file.name}
                className="rounded-md object-cover"
              />
            ) : (
              <span className="text-sm text-muted-foreground">
                {item.file.name}
              </span>
            )}

            <span className="flex-1 truncate text-sm">
              {item.file.name}
            </span>

            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="h-6 w-6"
              onClick={() => handleRemove(index)}
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FileUploadPreview