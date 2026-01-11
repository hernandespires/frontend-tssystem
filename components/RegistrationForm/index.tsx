"use client"

import { z, ZodObject } from "zod"
import { toast } from "sonner"
import { Form } from "../ui/form"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import { FaArrowLeft } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { UseFormReturn } from "react-hook-form"
import RoutesList from "../RoutesList"

const RegistrationForm = (
    { formSchema, urlPath, form, prevStep, children }: { formSchema: ZodObject, urlPath: { name: string; route: string; }[], form: UseFormReturn, prevStep: () => void, children: ReactNode }
) => {
    const router = useRouter()

    const onSubmit = (values: z.infer <typeof formSchema>) => {
        try {
            toast(<pre className="mt-2 w-85 rounded-md bg-slate-950 p-4"><code className="text-white">{JSON.stringify(values, null, 2)}</code></pre>)
        } catch (error) {
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <section className="flex flex-col gap-3">
            <RoutesList>
                { urlPath }
            </RoutesList>
            <Form {...form}>
                <section onSubmit={form.handleSubmit(onSubmit)} className="border px-5.5 py-3 flex flex-col gap-3 rounded-md">
                    <div className="flex gap-6 items-center">
                        <Button variant="secondary" onClick={ prevStep }>
                            <FaArrowLeft />
                            Voltar
                        </Button>
                        <span className="section-title">
                            Cadastrar Colaborador
                        </span>
                    </div>
                    { children }
                </section>
            </Form>
        </section>
    )
}

export default RegistrationForm