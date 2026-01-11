"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LuArrowBigRight } from "react-icons/lu"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction } from "react"

const PersonalInformation = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }:
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {"birthday": new Date()}
    })

    return (
        <section>
            <RegistrationForm formSchema={formSchema} urlPath={ urlPath } form={form} prevStep={ prevStep }>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold text-default-orange">
                        { actualStep }/5 - Dados Pessoais
                    </h1>
                    <Progress value={ percentageProgress } className="max-w-107.5" />
                </div>
                <form className="flex items-stretch gap-22.5 h-155 px-38.75 py-3" onSubmit={() => {}}>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                        <Field>
                            <FieldLabel htmlFor="name">
                                Nome completo
                            </FieldLabel>
                            <Input id="name" placeholder="Nome" {...form.register("name")} />            
                            <FieldError>
                                {form.formState.errors.name?.message}
                            </FieldError>
                        </Field>
                        <div className="flex w-full">
                            <Field className="max-w-1/2">
                                <FieldLabel htmlFor="birthday">
                                    Data de nascimento
                                </FieldLabel>
                                <Input id="birthday" placeholder="10, Janeiro 2026" {...form.register("birthday")} />
                                <FieldError>
                                    {form.formState.errors.birthday?.message}
                                </FieldError>
                            </Field>
                        </div>
                        <Field className="max-w-[35%]">
                            <FieldLabel htmlFor="civilState">
                                Estado Civil
                            </FieldLabel>
                            <Select {...form.register("civilState")}>
                                <SelectTrigger id="civilState">
                                    <SelectValue placeholder="Solteiro(a)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">
                                        Solteiro(a)
                                    </SelectItem>
                                    <SelectItem value="option2">
                                        Casado(a)
                                    </SelectItem>
                                    <SelectItem value="option3">
                                        Viúvo(a)
                                    </SelectItem>
                                </SelectContent>
                            </Select>                    
                            <FieldError>
                                {form.formState.errors.civilState?.message}
                            </FieldError>
                        </Field>
                        <Field className="max-w-[57%]">
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
                            <FieldLabel htmlFor="cpf">
                                CPF
                            </FieldLabel>
                            <Input id="cpf" placeholder="1231231241" {...form.register("cpf")} />
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
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-4.5 flex-1 h-fit">
                        <Field className="w-[48.5%]">
                            <FieldLabel htmlFor="phone">
                                Celular
                            </FieldLabel>
                            <Input id="phone" placeholder="(00) 00000-0000" {...form.register("phone")} />
                            <FieldError>
                                {form.formState.errors.phone?.message}
                            </FieldError>
                        </Field>
                        <h1 className="w-full">
                            Endereço
                        </h1>
                        <p className="text-[#a3a3a3] text-sm">
                            Endereço atual do colaborador.
                        </p>
                        <Field className="w-[48.5%]">
                            <FieldLabel htmlFor="city">
                                Cidade
                            </FieldLabel>
                            <Input id="city" placeholder="Jau" {...form.register("city")} />
                            <FieldError>
                                {form.formState.errors.city?.message}
                            </FieldError>
                        </Field>
                        <Field className="w-[48.5%]">
                            <FieldLabel htmlFor="postalCode">
                                Código Postal
                            </FieldLabel>
                            <Input id="postalCode" placeholder="11111-111" {...form.register("postalCode")} />
                            <FieldError>
                                {form.formState.errors.postalCode?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="street">
                                Rua
                            </FieldLabel>
                            <Input id="street" placeholder="Rua Lorem Ipsum" {...form.register("street")} />
                            <FieldError>
                                {form.formState.errors.street?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="neighborhood">
                                Bairro
                            </FieldLabel>
                            <Input id="neighborhood" placeholder="Bairro Lorem Ipsum" {...form.register("neighborhood")} />
                            <FieldError>
                                {form.formState.errors.neighborhood?.message}
                            </FieldError>
                        </Field>                        
                    </div>
                </form>
                <div className="flex justify-center">
                    <Button className="bg-default-orange h-15.25 w-107.5" onClick={() => nextStep(2)}>
                        <LuArrowBigRight />
                        Avançar
                    </Button>
                </div>                
            </RegistrationForm>
        </section>
    )
}

export default PersonalInformation