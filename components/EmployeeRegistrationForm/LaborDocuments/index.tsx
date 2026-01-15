"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const LaborDocuments = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }:
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema)
    })

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={() => nextStep(3)}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="flex items-stretch gap-22.5 h-112 px-38.75 py-3">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <FieldLabel>
                                Carteira de Trabalho
                            </FieldLabel>
                            <Input id="workCard" placeholder="12312312321" {...form.register("workCard")} />
                            <FieldError>
                                {form.formState.errors.workCard?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                PIS/PASEP
                            </FieldLabel>
                            <Input id="pisPasep" placeholder="12312312321" {...form.register("pisPasep")} />
                            <FieldError>
                                {form.formState.errors.pisPasep?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Titulo de Eleitor
                            </FieldLabel>
                            <Input id="voterRegistration" placeholder="12312312321" {...form.register("voterRegistration")} />
                            <FieldError>
                                {form.formState.errors.voterRegistration?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Tipo de Vínculo
                            </FieldLabel>
                            <Select {...form.register("typeEmployment")}>
                                <SelectTrigger id="civilState">
                                    <SelectValue placeholder="CLT" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        CLT
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        CNPJ
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Freelancer
                                    </SelectItem>
                                </SelectContent>
                            </Select>   
                            <FieldError>
                                {form.formState.errors.typeEmployment?.message}
                            </FieldError>
                        </Field>
                        <Field className="max-w-[68%]">
                            <FieldLabel>
                                Modalidade
                            </FieldLabel>
                            <Select {...form.register("laborModality")}>
                                <SelectTrigger id="civilState">
                                    <SelectValue placeholder="Presencial" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Presencial
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Semi-presencial
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Home office
                                    </SelectItem>
                                </SelectContent>
                            </Select>   
                            <FieldError>
                                {form.formState.errors.laborModality?.message}
                            </FieldError>
                        </Field>
                        <Field className="max-w-[24.5%]">
                            <FieldLabel>
                                Escala
                            </FieldLabel>
                            <Select {...form.register("laborScale")}>
                                <SelectTrigger id="civilState">
                                    <SelectValue placeholder="5x2" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        5x2
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        4x3
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        6x1
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>
                                {form.formState.errors.laborScale?.message}
                            </FieldError>
                        </Field>
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <FieldLabel>
                                Data de admissão
                            </FieldLabel>
                            <Input id="admissionDate" placeholder="11, Janeiro 2025" {...form.register("admissionDate")} />
                            <FieldError>
                                {form.formState.errors.admissionDate?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Salário
                            </FieldLabel>
                            <Input id="salary" placeholder="R$0000,00" {...form.register("salary")} />
                            <FieldError>
                                {form.formState.errors.salary?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Comprovante de residencia
                            </FieldLabel>
                            <Input id="residentialProve" type="file" {...form.register("residentialProve")} />
                            <FieldError>
                                {form.formState.errors.residentialProve?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <Checkbox id="reservist" />
                                <Label htmlFor="reservist">
                                    Resevista
                                </Label>
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Documentação
                            </FieldLabel>
                            <Input id="documentation" type="file" {...form.register("documentation")} />
                            <FieldError>
                                {form.formState.errors.documentation?.message}
                            </FieldError>
                        </Field>
                    </div>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default LaborDocuments