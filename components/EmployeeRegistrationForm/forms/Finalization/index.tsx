"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { formSchema } from "./formSchema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Finalization = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: () => void }
) => {
    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema)
    })

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={ nextStep }>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="max-w-full flex items-center justify-center">
                    <div className="w-200 h-72 flex flex-col justify-between items-center px-38.75 py-3">
                        <Field>
                            <FieldLabel htmlFor="department">
                                Departamento
                            </FieldLabel>
                            <Select {...form.register("department")}>
                                <SelectTrigger id="department">
                                    <SelectValue placeholder="Escolher departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Pesquisa & Desenvolvimento
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Web Design
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Tráfego Pago
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>
                                {form.formState.errors.department?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="operation">
                                Operação
                            </FieldLabel>
                            <Select {...form.register("operation")}>
                                <SelectTrigger id="operation">
                                    <SelectValue placeholder="01" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        01
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        02
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        03
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>
                                {form.formState.errors.operation?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="level">
                                Nível
                            </FieldLabel>
                            <Select {...form.register("level")}>
                                <SelectTrigger id="level">
                                    <SelectValue placeholder="Puppy" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Puppy
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Auxiliar
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Junior
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>
                                {form.formState.errors.level?.message}
                            </FieldError>
                        </Field>
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default Finalization