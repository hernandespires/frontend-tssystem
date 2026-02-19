"use client"

import { z, ZodObject } from "zod"
import { toast } from "sonner"
import { Form } from "../ui/form"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import { FaArrowLeft } from "react-icons/fa"
import { UseFormReturn } from "react-hook-form"
import RoutesList from "../RoutesList"
import { LuArrowBigRight } from "react-icons/lu"
import { SendEmployee } from "@/types/services/humanResources/employee"

const RegistrationForm = (
    { formSchema, urlPath, form, prevStep, children, nextStep }:
    { formSchema: ZodObject, urlPath: { name: string, route: string }[], form: UseFormReturn, prevStep: () => void, children: ReactNode, nextStep: (personalInformation: SendEmployee) => Promise<void> }
) => {
    const onSubmit = (values: z.infer<typeof formSchema>) => nextStep(values)

    const onError = (errors: any) => {
        const firstError = Object.values(errors).find((err: any) => err?.message)
        if (firstError?.message) toast.error(firstError.message)
    }

    return (
        <section className="flex flex-col gap-3">
            <RoutesList>
                { urlPath }
            </RoutesList>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="border px-5.5 py-3 flex flex-col gap-3 rounded-md">
                    <div className="flex gap-6 items-center">
                        <Button type="button" variant="secondary" className="cursor-pointer" onClick={ prevStep }>
                            <FaArrowLeft />
                            Voltar
                        </Button>
                        <span className="section-title">
                            Cadastrar Colaborador
                        </span>
                    </div>
                    { children }
                    <div className="flex justify-center">
                        <Button className="bg-default-orange h-15.25 w-107.5 cursor-pointer">
                            <LuArrowBigRight />
                            Avançar
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default RegistrationForm