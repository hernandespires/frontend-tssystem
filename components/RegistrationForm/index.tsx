"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Form } from "../ui/form"

const formSchema = z.object({
  name: z.string().min(1),
  birthday: z.coerce.date(),
  civilState: z.string(),
  nacionality: z.tuple([z.string().min(1), z.string().optional()]),
  rg: z.string().min(1).min(12).max(12),
  email: z.string(),
  motherName: z.string().min(1)
})

const RegistrationForm = () => {
    const [countryName, setCountryName] = useState < string > ('')
    const [stateName, setStateName] = useState < string > ('')

    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {"birthday": new Date()}
    })

    function onSubmit(values: z.infer <typeof formSchema> ) {
        try {
            console.log(values)
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            )
        } catch (error) {
            console.error("Form submission error", error)
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <Field>
                    <FieldLabel htmlFor="name">
                        Nome completo
                    </FieldLabel>
                    <Input id="name" placeholder="Nome" {...form.register("name")} />            
                    <FieldError>
                        {form.formState.errors.name?.message}
                    </FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="birthday">
                        Data de nascimento
                    </FieldLabel>
                    <Input id="birthday" placeholder="10, Janeiro 2026" {...form.register("birthday")} />
                    <FieldError>
                        {form.formState.errors.birthday?.message}
                    </FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="civilState">
                        Estado Civil
                    </FieldLabel>
                    <Select {...form.register("civilState")}>
                        <SelectTrigger id="civilState">
                            <SelectValue placeholder="Solteiro" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">
                                Option 1
                            </SelectItem>
                            <SelectItem value="option2">
                                Option 2
                            </SelectItem>
                            <SelectItem value="option3">
                                Option 3
                            </SelectItem>
                        </SelectContent>
                    </Select>                    
                    <FieldError>
                        {form.formState.errors.civilState?.message}
                    </FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="nacionality">
                        Nacionalidade
                    </FieldLabel>
                    <Input id="nacionality" placeholder="Brasileiro" {...form.register("nacionality")} />
                    <FieldError>
                        {form.formState.errors.nacionality?.message}
                    </FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="rg">
                        RG
                    </FieldLabel>
                    <Input id="rg" placeholder="1231231241" {...form.register("rg")} />                
                    <FieldError>
                        {form.formState.errors.rg?.message}
                    </FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">
                        Email para contato (Pessoal)
                    </FieldLabel>
                    <Input id="email" placeholder="Email" {...form.register("email")} />
                    <FieldError>
                        {form.formState.errors.email?.message}
                    </FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="mother-name">
                        Nome completo da mãe
                    </FieldLabel>
                    <Input id="mother-name" placeholder="Nome" {...form.register("motherName")} />
                    <FieldError>
                        {form.formState.errors.motherName?.message}
                    </FieldError>
                </Field>                
            </form>
        </Form>
    )
}

export default RegistrationForm