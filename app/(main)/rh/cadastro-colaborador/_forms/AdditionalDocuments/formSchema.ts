// import z from "zod"

// export const formSchema = z.object({
//   additionalDocuments: z.array(z.instanceof(File)).optional()
// })

import z from "zod"

export const formSchema = z.object({
  additionalDocuments: z.array(z.instanceof(File)).default([])
})