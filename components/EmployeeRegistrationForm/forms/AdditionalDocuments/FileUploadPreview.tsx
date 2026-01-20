import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ChangeEvent, useState } from "react"
import Image from "next/image"

const FileUploadPreview = ({ fieldName, form, }: { fieldName: string, form: any }) => {
    const [files, setFiles] = useState<{ file: File, url: string }[]>([])

    return (
        <Controller
            name={fieldName}
            control={form.control}
            render={({ field }) => (
                <section className="space-y-4">
                    <Input
                        type="file"
                        multiple
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const fileList = event.target.files
                            if (!fileList) return
                            field.onChange(fileList)

                            const mapped = Array.from(fileList).map((file) => ({ file, url: URL.createObjectURL(file) }))
                            setFiles(mapped)
                        }}
                    />
                    <div className="grid gap-2">
                        {files.map((item, index) => (
                            <div key={index} className="relative border rounded-lg p-2 flex flex-col items-center">
                                {item.file.type.startsWith("image/") ? (
                                        <Image src={item.url} width={128} height={128} className="object-cover rounded-md" alt={item.file.name} />
                                ) : (
                                    <div className="text-sm text-muted-foreground">
                                        {item.file.name}
                                    </div>
                                )}
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="destructive"
                                    className="absolute top-1 right-1 h-6 w-6"
                                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                                >
                                    <X size={14} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        />
    )
}

export default FileUploadPreview