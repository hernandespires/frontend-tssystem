"use client"

import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"

type PreviewFile = { file: File, url: string }
type FileUploadPreviewProps = { fieldName: string, form: any }

const FileUploadPreview = ({ fieldName, form }: FileUploadPreviewProps) => {
    const [files, setFiles] = useState<PreviewFile[]>([])

    return (
        <Controller name={fieldName} control={form.control} render={({ field }) => {            
            useEffect(() => {
                field.onChange(files.map((item) => item.file))
            }, [files])
            
            useEffect(() => {
                return () => files.forEach((item) => URL.revokeObjectURL(item.url))                
            }, [files])

            return (
                <section className="space-y-4">
                    <Input type="file" multiple onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const fileList = event.target.files
                        if (!fileList) return

                        const newFiles: PreviewFile[] = Array.from(fileList).map((file) => ({ file, url: URL.createObjectURL(file) }))
                        setFiles((prev) => [...prev, ...newFiles])

                        event.target.value = ""
                    }} />                
                    <div className="flex flex-col gap-2">
                        {files.map((item, index) => (
                            <div key={`${item.file.name}-${index}`} className="relative flex items-center gap-3 border rounded-lg p-2">
                                {item.file.type.startsWith("image/") ? (
                                    <Image src={item.url} width={64} height={64} alt={item.file.name} className="rounded-md object-cover" />
                                ) : (
                                    <span className="text-sm text-muted-foreground">{item.file.name}</span>
                                )}
                                <span className="flex-1 truncate text-sm">
                                    {item.file.name}
                                </span>
                                <Button type="button" size="icon" variant="destructive" className="h-6 w-6" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}>
                                    <X size={14} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            )
        }} />
    )
}

export default FileUploadPreview