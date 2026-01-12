import z from "zod"

export const formSchema = z.object({
    bank: z.string().min(1), agency: z.string().min(1), account: z.string().min(1), pix: z.string().min(1), cnpjTransportationVoucher: z.string().min(1), monthlyAmount: z.string().min(1)
})