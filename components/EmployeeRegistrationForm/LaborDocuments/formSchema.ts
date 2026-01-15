import z from "zod"

export const formSchema = z.object({
    workCard: z.string().min(1),
    pisPasep: z.string().min(1),
    voterRegistration: z.string().min(1),
    typeEmployment: z.string().min(1),
    laborModality: z.string().min(1),
    laborScale: z.string().min(1),
    admissionDate: z.string().min(1),
    salary: z.string().min(1),
    residentialProve: z.string().min(1),
    documentation: z.string().min(1)
})