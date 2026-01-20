import z from "zod"
import { defaultEmptyError } from "../../defaultFormFieldErrors"

export const formSchema = z.object({
    bank: z.enum(["santander", "sicred", "banco do brasil"], { error: defaultEmptyError("Banco") }), 
    agency: z.string().nonempty(defaultEmptyError("Agência")), 
    account: z.string().nonempty(defaultEmptyError("Conta")), 
    pix: z.string().nonempty(defaultEmptyError("Chave pix")), 
    cnpjTransportationVoucher: z.string().optional(),
    monthlyAmount: z.string().optional()
})