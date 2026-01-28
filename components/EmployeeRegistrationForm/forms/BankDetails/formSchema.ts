import z from "zod"
import { defaultEmptyError, defaultError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    bank: z.enum(["SANTANDER", "SICRED", "BANCO_DO_BRASIL"], { error: defaultError("Banco") }).nonoptional(defaultEmptyError("Banco")),
    agency: z.string({ error: defaultError("Agência") }).min(6, defaultError("Agência")).nonempty(defaultEmptyError("Agência")),
    account: z.string({ error: defaultError("Conta") }).min(6, defaultError("Conta")).nonempty(defaultEmptyError("Conta")),
    pix: z.string({ error: defaultError("Chave pix") }).nonempty("Chave pix"),
    transportationVoucher: z.boolean(),
    cnpjTransportationVoucher: z.string({ error: defaultError("CNPJ da empresa de transporte") }).min(18, defaultError("CNPJ da empresa de transporte")).optional(),
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