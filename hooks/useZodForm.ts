import { z, ZodAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const useZodForm = <TSchema extends ZodAny>(schema: TSchema) => {
    return useForm<z.infer<TSchema>>({ resolver: zodResolver(schema), criteriaMode: "firstError", mode: "onSubmit" })
}