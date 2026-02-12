"use client"

import { useContext, ChangeEvent } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadContext } from "@/contexts/files/UploadContext"
import { UseFormReturn } from "react-hook-form"

type FileWithPreview = File & { preview?: string }

const FileUploadPreview = ({
  fieldName,
  form
}: {
  fieldName: string
  form: UseFormReturn<any>
}) => {

  const uploadContext = useContext(UploadContext)
  if (!uploadContext) return null

  const { uploadData, setFiles } = uploadContext

  const localFiles: FileWithPreview[] = (uploadData[fieldName] ?? []).map(file => {
    if (!(file as FileWithPreview).preview) {
      ;(file as FileWithPreview).preview = URL.createObjectURL(file)
    }
    return file as FileWithPreview
  })

  const syncForm = (files: File[]) => {
    form.setValue(fieldName, files, {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    const newFiles: FileWithPreview[] = Array.from(fileList).map(file => {
      const f = file as FileWithPreview
      f.preview = URL.createObjectURL(file)
      return f
    })

    const updatedFiles = [...localFiles, ...newFiles]

    setFiles(fieldName, updatedFiles)
    syncForm(updatedFiles.map(f => f as File))

    e.target.value = ""
  }

  const handleRemove = (index: number) => {
    const removed = localFiles[index]

    if (removed.preview) URL.revokeObjectURL(removed.preview)

    const updated = localFiles.filter((_, i) => i !== index)
    setFiles(fieldName, updated)
    syncForm(updated.map(f => f as File))
  }

  return (
    <section className="space-y-4">
      <Input
        type="file"        
        multiple
        accept=".pdf, .png, .docx, .jpg"
        onChange={handleAddFiles}
      />

      <div className="flex flex-col gap-2">
        {localFiles.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border rounded-lg p-2"
          >
            {item.type.startsWith("image/") && item.preview
              ? <Image src={item.preview} width={64} height={64} alt="" />
              : <span>{item.name}</span>
            }

            <span className="flex-1 truncate text-sm">{item.name}</span>

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="h-6 w-6"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleRemove(index)
            }}
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