"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction, useContext } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CreateEmployeeContext } from "@/contexts/rh/CreateEmployeeContext"

const BankDetails = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: 
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const { personalInformation, setPersonalInformation } = useContext(CreateEmployeeContext)

    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema)
    })

    console.log(personalInformation)

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep } nextStep={() => nextStep(4)}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <div className="flex items-stretch gap-22.5 h-112 px-38.75 py-3">
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <FieldLabel htmlFor="bank">
                                Banco
                            </FieldLabel>
                            <Select {...form.register("bank")}>
                                <SelectTrigger id="bank">
                                    <SelectValue placeholder="Santander" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Santander
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Sicred
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Banco do Brasil
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>
                                {form.formState.errors.bank?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="agency">
                                Agência
                            </FieldLabel>
                            <Input id="agency" placeholder="1111111111111" {...form.register("agency")} />
                            <FieldError>
                                {form.formState.errors.agency?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="account">
                                Conta
                            </FieldLabel>
                            <Input id="account" placeholder="1111111111111" {...form.register("account")} />
                            <FieldError>
                                {form.formState.errors.account?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pix">
                                Chave Pix
                            </FieldLabel>
                            <Input id="pix" placeholder="14997692681" {...form.register("pix")} />
                            <FieldError>
                                {form.formState.errors.pix?.message}
                            </FieldError>
                        </Field>
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <div className="flex gap-2">
                                <Checkbox id="transportationVoucher" />
                                <Label htmlFor="transportationVoucher">
                                    Vale Transporte
                                </Label>
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="cnpjTransportationVoucher">
                                CNPJ - Empresa vale transporte
                            </FieldLabel>
                            <Input id="cnpjTransportationVoucher" placeholder="14997692681" {...form.register("cnpjTransportationVoucher")} />
                            <FieldError>
                                {form.formState.errors.cnpjTransportationVoucher?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="monthlyAmount">
                                Valor mensal
                            </FieldLabel>
                            <Input id="monthlyAmount" placeholder="14997692681" {...form.register("monthlyAmount")} />
                            <FieldError>
                                {form.formState.errors.monthlyAmount?.message}
                            </FieldError>
                        </Field>
                    </div>
                </div>                
            </RegistrationForm>
        </section>
    )
}

export default BankDetails