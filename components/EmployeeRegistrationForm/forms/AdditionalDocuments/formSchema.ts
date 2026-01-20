import z from "zod"

export const formSchema = z.object({ additionalDocuments: z.custom<FileList>().refine(files => files instanceof FileList).optional() })