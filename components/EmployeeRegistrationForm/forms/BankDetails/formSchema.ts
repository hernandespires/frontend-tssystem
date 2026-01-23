import z from "zod"
import { defaultEmptyError, defaultError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    bank: z.enum(["SANTANDER", "SICRED", "BANCO_DO_BRASIL"], { error: defaultEmptyError("Banco") }), 
    agency: z.string({ error: defaultEmptyError("Agência") }).min(4, defaultError("Agência")),
    account: z.string({ error: defaultEmptyError("Conta") }).min(10, defaultError("Conta")),
    pix: z.string({ error: defaultEmptyError("Chave pix") }),
    transportationVoucher: z.boolean(),
    cnpjTransportationVoucher: z.string({ error: defaultError("CNPJ da empresa de transporte") }).optional(),
    monthlyAmount: z.string().optional()
}).superRefine((data, ctx) => {
    if (data.transportationVoucher) {
        if (!data.cnpjTransportationVoucher || data.cnpjTransportationVoucher.length === 0) {
            ctx.addIssue({ code: "custom", path: ["cnpjTransportationVoucher"], message: defaultEmptyError("CNPJ da empresa do vale transporte") })
        } else if (!data.monthlyAmount || data.monthlyAmount.length === 0) {
            ctx.addIssue({ code: "custom", path: ["monthlyAmount"], message: defaultEmptyError("Valor mensal") })
        }
    }
})