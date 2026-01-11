"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LuArrowBigRight } from "react-icons/lu"
import RegistrationForm from "@/components/RegistrationForm"
import { Progress } from "../../ui/progress"
import { formSchema } from "./formSchema"
import { Dispatch, SetStateAction } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const BankDetails = (
    { urlPath, prevStep, actualStep, percentageProgress, nextStep }: 
    { urlPath: { name: string; route: string; }[], prevStep: () => void, actualStep: number, percentageProgress: number, nextStep: Dispatch<SetStateAction<number>> }
) => {
    const form = useForm <z.infer <typeof formSchema>> ({
        resolver: zodResolver(formSchema)
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
                <form className="flex items-stretch gap-22.5 h-112 px-38.75 py-3" onSubmit={() => {}}>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                    </div>
                    <div>
                        <Separator orientation="vertical" className="self-stretch w-px bg-default-border-color" />
                    </div>
                    <div className="flex flex-wrap flex-1 gap-x-6 gap-y-4.5 h-fit">
                    </div>
                </form>
                <div className="flex justify-center">
                    <Button className="bg-default-orange h-15.25 w-107.5" onClick={() => nextStep(3)}>
                        <LuArrowBigRight />
                        Avançar
                    </Button>
                </div>
            </RegistrationForm>
        </section>
    )
}

export default BankDetails